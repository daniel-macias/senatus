import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { SocialMediaInput } from './socialMedia.input';

@InputType()
export class CreateMemberInput {
  @Field()
  name: string;

  @Field(() => ID)
  party: Types.ObjectId;

  @Field()
  position: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [SocialMediaInput], { nullable: true })
  socialMedia?: SocialMediaInput[];
}

@InputType()
export class UpdateMemberInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  party?: Types.ObjectId;

  @Field({ nullable: true })
  position?: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [SocialMediaInput], { nullable: true })
  socialMedia?: SocialMediaInput[];
}

