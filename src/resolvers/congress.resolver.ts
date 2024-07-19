import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CongressService } from '../services/congress.service';
import { Congress } from '../schemas/congress.schema';
import { CreateCongressInput, UpdateCongressInput } from '../dto/congress.input';

@Resolver(() => Congress)
export class CongressResolver {
  constructor(private readonly congressService: CongressService) {}

  @Query(() => [Congress])
  async getAllCongresses() {
    return this.congressService.findAll();
  }

  @Query(() => Congress)
  async getCongressById(@Args('id', { type: () => ID }) id: string): Promise<Congress> {
    return this.congressService.findById(id);
  }

  @Mutation(() => Congress)
  async createCongress(@Args('createCongressInput') createCongressInput: CreateCongressInput) {
    return this.congressService.create(createCongressInput);
  }

  @Mutation(() => Congress)
  async updateCongress(
    @Args('id') id: string,
    @Args('updateCongressInput') updateCongressInput: UpdateCongressInput,
  ) {
    return this.congressService.update(id, updateCongressInput);
  }

  @Mutation(() => Congress)
  async deleteCongress(@Args('id') id: string) {
    return this.congressService.delete(id);
  }
}
