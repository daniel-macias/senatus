import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field()
  agenda: string;

  @Field(() => [ID], { nullable: true })
  pollIds?: string[];
}

@InputType()
export class UpdateSessionInput {
  @Field({ nullable: true })
  start?: Date;

  @Field({ nullable: true })
  end?: Date;

  @Field({ nullable: true })
  agenda?: string;

  @Field(() => [ID], { nullable: true })
  pollIds?: string[];
}
