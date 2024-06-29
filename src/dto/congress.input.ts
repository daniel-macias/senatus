import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCongressInput {
  @Field()
  name: string;

  @Field()
  organization: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String], { nullable: true })
  memberIds?: string[];

  @Field(type => [String], { nullable: true })
  sessionIds?: string[];
}

@InputType()
export class UpdateCongressInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String], { nullable: true })
  memberIds?: string[];

  @Field(type => [String], { nullable: true })
  sessionIds?: string[];
}

