import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePollInput {
  @Field()
  question: string;

  @Field(() => [ID], { nullable: true })
  voteIds?: string[];

  @Field({ nullable: true })
  description?: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class UpdatePollInput {
  @Field({ nullable: true })
  question?: string;

  @Field(() => [ID], { nullable: true })
  voteIds?: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  status?: string;
}
