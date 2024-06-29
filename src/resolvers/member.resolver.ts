import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MemberService } from '../services/member.service';
import { Member } from '../schemas/member.schema';
import { CreateMemberInput, UpdateMemberInput } from '../dto/member.input';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  async getAllMembers(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Query(() => Member)
  async getMemberById(@Args('id', { type: () => ID }) id: string): Promise<Member> {
    return this.memberService.findById(id);
  }

  @Mutation(() => Member)
  async createMember(@Args('input') input: CreateMemberInput): Promise<Member> {
    return this.memberService.create(input);
  }

  @Mutation(() => Member)
  async updateMember(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateMemberInput
  ): Promise<Member> {
    return this.memberService.update(id, input);
  }

  @Mutation(() => Member)
  async deleteMember(@Args('id', { type: () => ID }) id: string): Promise<Member> {
    return this.memberService.delete(id);
  }
}
