import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vote } from '../schemas/vote.schema';
import { CreateVoteInput, UpdateVoteInput } from '../dto/vote.input';

@Injectable()
export class VoteService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) {}

  async findAll(): Promise<Vote[]> {
    return this.voteModel.find().exec();
  }

  async findById(id: string): Promise<Vote> {
    const vote = await this.voteModel.findById(id).exec();
    if (!vote) {
      throw new NotFoundException(`Vote with ID ${id} not found`);
    }
    return vote;
  }

  async create(input: CreateVoteInput): Promise<Vote> {
    const newVote = new this.voteModel({
      ...input,
      member: new Types.ObjectId(input.memberId),
    });
    return newVote.save();
  }

  async update(id: string, input: UpdateVoteInput): Promise<Vote> {
    const existingVote = await this.voteModel.findByIdAndUpdate(
      id,
      input,
      { new: true }
    ).exec();
    if (!existingVote) {
      throw new NotFoundException(`Vote with ID ${id} not found`);
    }
    return existingVote;
  }

  async delete(id: string): Promise<Vote> {
    const deletedVote = await this.voteModel.findByIdAndDelete(id).exec();
    if (!deletedVote) {
      throw new NotFoundException(`Vote with ID ${id} not found`);
    }
    return deletedVote;
  }
}
