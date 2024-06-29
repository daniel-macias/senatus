import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Poll } from './poll.schema';

@ObjectType()
@Schema()
export class Session extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  start: Date;

  @Field()
  @Prop({ required: true })
  end: Date;

  @Field()
  @Prop({ required: true })
  agenda: string;

  @Field(() => [Poll], { nullable: true })
  @Prop({ type: [Types.ObjectId], ref: 'Poll' })
  polls: Types.ObjectId[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
