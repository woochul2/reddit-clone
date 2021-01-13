import { Resolver, Ctx, Arg, Mutation, InputType, Field } from 'type-graphql';
import { MyContext } from '../interfaces';
import { User } from '../entities/User';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field(() => String)
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { username: options.username });
    if (user) {
      return null;
    }
    const hashedPassword = await argon2.hash(options.password);
    const newUser = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(newUser);
    return newUser;
  }
}
