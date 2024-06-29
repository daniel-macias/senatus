import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SocialMedia } from 'src/types/socialMedia.type';

@ObjectType()
@Schema()
export class Member extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Party' })
  party: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  position: string;

  @Field({ nullable: true })
  @Prop()
  photoUrl: string;

  @Field({ nullable: true })
  @Prop({ type: Date })
  startDate: Date;

  @Field({ nullable: true })
  @Prop({ type: Date })
  endDate: Date;

  @Field({ nullable: true })
  @Prop()
  bio: string;

  @Field(() => [SocialMedia], { nullable: true })
  @Prop({ type: [{ platform: String, url: String }] })
  socialMedia: SocialMedia[];
}


export const MemberSchema = SchemaFactory.createForClass(Member);
