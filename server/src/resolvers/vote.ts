import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { Vote } from '../entities/Vote';
import { MyContext } from '../interfaces';
import { isLoggedIn } from '../middleware/isLoggedIn';

@Resolver(() => Vote)
export class VoteResolver {
  @Query(() => [Vote])
  @UseMiddleware(isLoggedIn)
  async votings(): Promise<Vote[]> {
    return await Vote.find();
  }

  @Query(() => Vote, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async voting(
    @Arg('postId', () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Vote | undefined> {
    const { userId } = req.session;
    return await Vote.findOne({ userId, postId });
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async vote(
    @Arg('postId', () => Int) postId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const { userId } = req.session;
    const vote = await Vote.findOne({ userId, postId });
    const post = await Post.findOne(postId);
    if (!post) {
      return null;
    }

    if (vote) {
      if (vote.value === value) {
        Vote.delete(vote);
        post.voteCounts -= value;
        post.voteStatus = null;
      } else {
        vote.value = value;
        await Vote.save(vote);
        post.voteCounts += 2 * value;
        post.voteStatus = value;
      }
    } else {
      await Vote.insert({
        userId,
        postId,
        value,
      });
      post.voteCounts += value;
      post.voteStatus = value;
    }

    await Post.save(post);
    return post;
  }
}
