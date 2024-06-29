import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Member } from './member.schema';

@ObjectType()
@Schema()
export class Vote extends Document {
  @Field(() => ID)
  _id: string;

  @Field(() => Member)
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  member: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  vote: string; // Vote yes, no, abstain
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
