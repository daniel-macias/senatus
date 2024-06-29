import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Vote } from './vote.schema';

@ObjectType()
@Schema()
export class Poll extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  question: string;

  @Field(() => [Vote], { nullable: true })
  @Prop({ type: [Types.ObjectId], ref: 'Vote' })
  votes: Types.ObjectId[];

  @Field({ nullable: true })
  @Prop()
  description: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field({ nullable: true })
  @Prop()
  type: string; // 2/3 Yea-And-Nay, etc

  @Field({ nullable: true })
  @Prop()
  status: string; // Passed, etc
}

export const PollSchema = SchemaFactory.createForClass(Poll);
