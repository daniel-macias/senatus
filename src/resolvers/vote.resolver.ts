import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { VoteService } from '../services/vote.service';
import { Vote } from '../schemas/vote.schema';
import { CreateVoteInput, UpdateVoteInput } from '../dto/vote.input';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Query(() => [Vote])
  async getAllVotes(): Promise<Vote[]> {
    return this.voteService.findAll();
  }

  @Query(() => Vote)
  async getVoteById(@Args('id', { type: () => ID }) id: string): Promise<Vote> {
    return this.voteService.findById(id);
  }

  @Mutation(() => Vote)
  async createVote(@Args('input') input: CreateVoteInput): Promise<Vote> {
    return this.voteService.create(input);
  }

  @Mutation(() => Vote)
  async updateVote(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateVoteInput
  ): Promise<Vote> {
    return this.voteService.update(id, input);
  }

  @Mutation(() => Vote)
  async deleteVote(@Args('id', { type: () => ID }) id: string): Promise<Vote> {
    return this.voteService.delete(id);
  }
}
