import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { v4 } from 'uuid';
import validator from 'validator';
import { FORGET_PASSWORD_PREFIX } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { sendEmail } from '../utils/sendEmail';

@InputType()
class LoginInput {
  @Field()
  usernameOrEmail: string;
  @Field()
  password: string;
}

@InputType()
class RegisterInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
  @Field({ nullable: true })
  token?: string;
}

const setError = (field: string, message: string) => {
  return {
    field,
    message,
  };
};

const validatePassword = (password: string, field: string) => {
  if (password.length <= 2) {
    return {
      errors: [setError(field, '비밀번호 길이는 3글자 이상이어야 합니다.')],
    };
  }
  return null;
};

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId }: MyContext) {
    if (!userId) {
      return null;
    }
    const user = await User.findOne(userId);
    return user;
  }

  @Query(() => Number, { nullable: true })
  async userId(@Arg('token') token: string, @Ctx() { redis }: MyContext) {
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    return userId;
  }

  @Mutation(() => UserResponse)
  async register(@Arg('input') input: RegisterInput): Promise<UserResponse> {
    if (!validator.isEmail(input.email)) {
      return {
        errors: [setError('email', '올바른 이메일 주소를 입력해 주세요.')],
      };
    }
    const sameEmailUser = await User.findOne({ email: input.email });
    if (sameEmailUser) {
      return {
        errors: [setError('email', '이메일이 이미 사용 중입니다.')],
      };
    }
    const sameUsernameUser = await User.findOne({
      username: input.username,
    });
    if (sameUsernameUser) {
      return {
        errors: [setError('username', '아이디가 이미 존재합니다.')],
      };
    }
    if (input.username.length <= 2) {
      return {
        errors: [
          setError('username', '아이디 길이는 3글자 이상이어야 합니다.'),
        ],
      };
    }
    if (input.username.length > 12) {
      return {
        errors: [setError('username', '아이디 길이는 12글자 이하여야 합니다.')],
      };
    }
    const passwordError = validatePassword(input.password, 'password');
    if (passwordError) return passwordError;

    const hashedPassword = await argon2.hash(input.password);
    const newUser = User.create({
      createdAt: Date(),
      updatedAt: Date(),
      email: input.email,
      username: input.username,
      password: hashedPassword,
    });
    await User.save(newUser);

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_TOKEN_SECRET
    );

    return { token, user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') input: LoginInput): Promise<UserResponse> {
    let user: User | undefined;
    if (validator.isEmail(input.usernameOrEmail)) {
      user = await User.findOne({ email: input.usernameOrEmail });
    } else {
      user = await User.findOne({ username: input.usernameOrEmail });
    }
    if (!user) {
      return {
        errors: [
          setError(
            'usernameOrEmail',
            '아이디 또는 이메일이 존재하지 않습니다.'
          ),
        ],
      };
    }

    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [setError('password', '비밀번호가 일치하지 않습니다.')],
      };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN_SECRET);

    return { token, user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { userId }: MyContext) {
    if (!userId) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ email });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'EX',
      60 * 60 * 24 // 1일
    );

    await sendEmail(
      email,
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">비밀번호 재설정</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResponse> {
    const passwordError = validatePassword(newPassword, 'newPassword');
    if (passwordError) return passwordError;

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [setError('token', '유효 기간이 만료되었습니다.')],
      };
    }

    const user = await User.findOne(parseInt(userId));
    if (!user) {
      return {
        errors: [setError('user', '사용자가 존재하지 않습니다.')],
      };
    }
    user.password = await argon2.hash(newPassword);
    await User.save(user);

    await redis.del(key);

    return { user };
  }
}
