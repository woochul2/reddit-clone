import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
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

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    const posts = getConnection()
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.creator', 'user')
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    return posts;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isLoggedIn)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const creator = await User.findOne(req.session.userId);
    if (!creator) {
      return null;
    }

    return await Post.create({
      ...input,
      createdAt: Date(),
      updatedAt: Date(),
      creatorId: req.session.userId,
      creator: creator,
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
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    await Post.delete(id);
    return true;
  }
}
