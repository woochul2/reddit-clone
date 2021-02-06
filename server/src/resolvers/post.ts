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
  async posts(
    @Arg('variant') _variant: string,
    @Ctx() { req }: MyContext
  ): Promise<Post[]> {
    const { userId } = req.session;
    let queryParams = [];
    if (userId) {
      queryParams.push(userId);
    }

    return await getConnection().query(
      `
      SELECT "post".*,
      to_json("myUser") creator,
      ${
        userId
          ? `(SELECT "vote"."value" AS "voteStatus" FROM "vote" "vote" WHERE "vote"."userId" = $1 and "vote"."postId" = "post"."id")`
          : 'null AS "voteStatus"'
      }
      FROM "post"
      INNER JOIN "user" "myUser" ON "myUser"."id"="post"."creatorId"
      ORDER BY "post"."createdAt" DESC
      `,
      queryParams
    );
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return await Post.findOne(id);
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
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    await Post.delete(id);
    return true;
  }
}
