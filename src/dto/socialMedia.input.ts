import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SocialMediaInput {
  @Field()
  platform: string;

  @Field()
  url: string;
}
