import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SocialMedia {
  @Field()
  platform: string;

  @Field()
  url: string;
}
