import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SessionService } from '../services/session.service';
import { Session } from '../schemas/session.schema';
import { CreateSessionInput, UpdateSessionInput } from '../dto/session.input';

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Query(() => [Session])
  async getAllSessions(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Query(() => Session)
  async getSessionById(@Args('id', { type: () => ID }) id: string): Promise<Session> {
    return this.sessionService.findById(id);
  }

  @Mutation(() => Session)
  async createSession(@Args('input') input: CreateSessionInput): Promise<Session> {
    return this.sessionService.create(input);
  }

  @Mutation(() => Session)
  async updateSession(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSessionInput
  ): Promise<Session> {
    return this.sessionService.update(id, input);
  }

  @Mutation(() => Session)
  async deleteSession(@Args('id', { type: () => ID }) id: string): Promise<Session> {
    return this.sessionService.delete(id);
  }
}
