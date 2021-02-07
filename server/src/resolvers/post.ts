import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { Vote } from '../entities/Vote';
import { MyContext } from '../interfaces';
import { isLoggedIn } from '../middleware/isLoggedIn';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver(() => Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    if (post.text.length > 50) {
      return post.text.slice(0, 50) + ' ...';
    }
    return post.text;
  }

  @FieldResolver(() => User)
  async creator(@Root() post: Post) {
    return await User.findOne(post.creatorId);
  }

  @FieldResolver(() => User)
  async voteStatus(@Root() post: Post, @Ctx() { req }: MyContext) {
    const { userId } = req.session;
    if (!userId) {
      return null;
    }

    const voting = await Vote.findOne({ userId, postId: post.id });
    if (!voting) {
      return null;
    }

    return voting.value;
  }

  @Query(() => [Post])
  async posts(@Arg('variant') _variant: string): Promise<Post[]> {
    return await getConnection()
      .getRepository(Post)
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => Int) id: number): Promise<Post | null> {
    const post = await getConnection()
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .getOne();

    if (!post) {
      return null;
    }

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    return await Post.create({
      ...input,
      createdAt: Date(),
      updatedAt: Date(),
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title, updatedAt: Date() });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
