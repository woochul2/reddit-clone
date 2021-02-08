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
import { Comment } from '../entities/Comment';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from '../interfaces';
import { isLoggedIn } from '../middleware/isLoggedIn';

@InputType()
class CommentInput {
  @Field()
  text: string;

  @Field(() => Int)
  postId: number;
}

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return await Comment.find();
  }

  @FieldResolver(() => User, { nullable: true })
  async creator(@Root() comment: Comment): Promise<User | null> {
    const user = await User.findOne(comment.creatorId);
    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async writeComment(
    @Arg('input') input: CommentInput,
    @Ctx() { req }: MyContext
  ): Promise<Comment | null> {
    const { userId } = req.session;
    const post = await Post.findOne(input.postId);
    if (!post) {
      return null;
    }

    const comment = Comment.create({
      createdAt: Date(),
      updatedAt: Date(),
      text: input.text,
      creatorId: userId,
      postId: input.postId,
    });
    await Comment.save(comment);

    return comment;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async deleteComment(
    @Arg('id', () => Int) id: number
  ): Promise<Boolean | null> {
    await Comment.delete(id);
    return true;
  }

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async updateComment(
    @Arg('id', () => Int) id: number,
    @Arg('text') text: string
  ): Promise<Comment | null> {
    const comment = await Comment.findOne(id);
    if (!comment) {
      return null;
    }

    comment.text = text;
    comment.updatedAt = Date();
    await Comment.save(comment);

    return comment;
  }
}
