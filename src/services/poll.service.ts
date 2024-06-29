import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Poll } from '../schemas/poll.schema';
import { CreatePollInput, UpdatePollInput } from '../dto/poll.input';

@Injectable()
export class PollService {
  constructor(@InjectModel(Poll.name) private pollModel: Model<Poll>) {}

  async findAll(): Promise<Poll[]> {
    return this.pollModel.find().exec();
  }

  async findById(id: string): Promise<Poll> {
    const poll = await this.pollModel.findById(id).exec();
    if (!poll) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }
    return poll;
  }

  async create(input: CreatePollInput): Promise<Poll> {
    const newPoll = new this.pollModel({
      ...input,
      votes: input.voteIds?.map(id => new Types.ObjectId(id)),
    });
    return newPoll.save();
  }

  async update(id: string, input: UpdatePollInput): Promise<Poll> {
    const existingPoll = await this.pollModel.findByIdAndUpdate(
      id,
      {
        ...input,
        votes: input.voteIds?.map(id => new Types.ObjectId(id)),
      },
      { new: true }
    ).exec();
    if (!existingPoll) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }
    return existingPoll;
  }

  async delete(id: string): Promise<Poll> {
    const deletedPoll = await this.pollModel.findByIdAndDelete(id).exec();
    if (!deletedPoll) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }
    return deletedPoll;
  }
}
