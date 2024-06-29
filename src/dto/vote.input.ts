import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => ID)
  memberId: string;

  @Field()
  vote: string; // Vote yes, no, abstain
}

@InputType()
export class UpdateVoteInput {
  @Field({ nullable: true })
  vote?: string; // Vote yes, no, abstain
}
