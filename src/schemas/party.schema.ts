import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

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

}

export const PartySchema = SchemaFactory.createForClass(Party);
