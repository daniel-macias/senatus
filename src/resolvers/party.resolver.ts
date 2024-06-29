import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PartyService } from '../services/party.service';
import { Party } from '../schemas/party.schema';
import { CreatePartyInput, UpdatePartyInput } from '../dto/party.input';

@Resolver(() => Party)
export class PartyResolver {
  constructor(private readonly partyService: PartyService) {}

  @Query(() => [Party])
  async getAllParties(): Promise<Party[]> {
    return this.partyService.findAll();
  }

  @Query(() => Party)
  async getPartyById(@Args('id', { type: () => ID }) id: string): Promise<Party> {
    return this.partyService.findById(id);
  }

  @Mutation(() => Party)
  async createParty(@Args('input') input: CreatePartyInput): Promise<Party> {
    return this.partyService.create(input);
  }

  @Mutation(() => Party)
  async updateParty(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePartyInput
  ): Promise<Party> {
    return this.partyService.update(id, input);
  }

  @Mutation(() => Party)
  async deleteParty(@Args('id', { type: () => ID }) id: string): Promise<Party> {
    return this.partyService.delete(id);
  }
}
