import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Member } from './member.schema';

@Schema()
@ObjectType()
export class Congress extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  organization: string;

  @Prop()
  @Field({ nullable: true })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Member' })
  @Field(() => [Member], { nullable: 'items' })
  members: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Session' })
  @Field(() => [ID], { nullable: 'items' })
  sessions: Types.ObjectId[];
}

export const CongressSchema = SchemaFactory.createForClass(Congress);
