import argon2 from 'argon2';
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
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, WEB_URL } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../interfaces';
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
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Query(() => Number, { nullable: true })
  async userId(@Arg('token') token: string, @Ctx() { redis }: MyContext) {
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    return userId;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: RegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (!validator.isEmail(options.email)) {
      return {
        errors: [setError('email', '올바른 이메일 주소를 입력해 주세요.')],
      };
    }
    const sameEmailUser = await em.findOne(User, { email: options.email });
    if (sameEmailUser) {
      return {
        errors: [setError('email', '이메일이 이미 사용 중입니다.')],
      };
    }
    const sameUsernameUser = await em.findOne(User, {
      username: options.username,
    });
    if (sameUsernameUser) {
      return {
        errors: [setError('username', '아이디가 이미 존재합니다.')],
      };
    }
    if (options.username.length <= 2) {
      return {
        errors: [
          setError('username', '아이디 길이는 3글자 이상이어야 합니다.'),
        ],
      };
    }
    const passwordError = validatePassword(options.password, 'password');
    if (passwordError) return passwordError;

    const hashedPassword = await argon2.hash(options.password);
    const newUser = em.create(User, {
      email: options.email,
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(newUser);
    req.session.userId = newUser.id;
    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: LoginInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    let user: User | null;
    if (validator.isEmail(options.usernameOrEmail)) {
      user = await em.findOne(User, { email: options.usernameOrEmail });
    } else {
      user = await em.findOne(User, { username: options.usernameOrEmail });
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

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [setError('password', '비밀번호가 일치하지 않습니다.')],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      return false;
    }
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { em, redis }: MyContext
  ) {
    const user = await em.findOne(User, { email });
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
      `<a href="${WEB_URL}/change-password/${token}">비밀번호 재설정</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { em, redis }: MyContext
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

    const user = await em.findOne(User, { id: parseInt(userId as string) });
    if (!user) {
      return {
        errors: [setError('user', '사용자가 존재하지 않습니다.')],
      };
    }
    user.password = await argon2.hash(newPassword);
    await em.persistAndFlush(user);

    await redis.del(key);

    return { user };
  }
}
