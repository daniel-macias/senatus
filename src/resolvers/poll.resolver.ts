import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PollService } from '../services/poll.service';
import { Poll } from '../schemas/poll.schema';
import { CreatePollInput, UpdatePollInput } from '../dto/poll.input';

@Resolver(() => Poll)
export class PollResolver {
  constructor(private readonly pollService: PollService) {}

  @Query(() => [Poll])
  async getAllPolls(): Promise<Poll[]> {
    return this.pollService.findAll();
  }

  @Query(() => Poll)
  async getPollById(@Args('id', { type: () => ID }) id: string): Promise<Poll> {
    return this.pollService.findById(id);
  }

  @Mutation(() => Poll)
  async createPoll(@Args('input') input: CreatePollInput): Promise<Poll> {
    return this.pollService.create(input);
  }

  @Mutation(() => Poll)
  async updatePoll(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePollInput
  ): Promise<Poll> {
    return this.pollService.update(id, input);
  }

  @Mutation(() => Poll)
  async deletePoll(@Args('id', { type: () => ID }) id: string): Promise<Poll> {
    return this.pollService.delete(id);
  }
}
