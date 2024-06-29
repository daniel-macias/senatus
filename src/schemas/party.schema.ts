import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SocialMedia } from 'src/types/socialMedia.type';

@ObjectType()
@Schema()
export class Party extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  ideology: string;

  @Field()
  @Prop({ required: true })
  color: string;

  @Field({ nullable: true })
  @Prop()
  leader: string;

  @Field({ nullable: true })
  @Prop({ type: Date })
  founded: Date;

  @Field({ nullable: true })
  @Prop()
  headquarters: string;

  @Field({ nullable: true })
  @Prop()
  website: string;

  @Field({ nullable: true })
  @Prop()
  photoUrl: string;

  @Field(() => [SocialMedia], { nullable: true })
  @Prop({ type: [{ platform: String, url: String }] })
  socialMedia: SocialMedia[];
}

export const PartySchema = SchemaFactory.createForClass(Party);
