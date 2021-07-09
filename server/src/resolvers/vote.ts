import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '../entities/Post';
import { Vote } from '../entities/Vote';
import { isLoggedIn } from '../middleware/isLoggedIn';
import { MyContext } from '../types';

@Resolver(() => Vote)
export class VoteResolver {
  @Query(() => [Vote])
  @UseMiddleware(isLoggedIn)
  async votings(): Promise<Vote[]> {
    return await Vote.find();
  }

  @Query(() => Vote, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async voting(@Arg('postId', () => Int) postId: number, @Ctx() { userId }: MyContext): Promise<Vote | undefined> {
    return await Vote.findOne({ userId, postId });
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isLoggedIn)
  async vote(
    @Arg('postId', () => Int) postId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { userId }: MyContext
  ): Promise<Post | null> {
    const vote = await Vote.findOne({ userId, postId });
    const post = await Post.findOne(postId);
    if (!post) {
      return null;
    }

    if (vote) {
      if (vote.value === value) {
        Vote.delete(vote);
        post.voteCount -= value;
        post.voteStatus = null;
      } else {
        vote.value = value;
        await Vote.save(vote);
        post.voteCount += 2 * value;
        post.voteStatus = value;
      }
    } else {
      await Vote.insert({
        userId,
        postId,
        value,
      });
      post.voteCount += value;
      post.voteStatus = value;
    }

    await Post.save(post);
    return post;
  }
}
