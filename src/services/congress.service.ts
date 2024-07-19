import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Congress } from '../schemas/congress.schema';
import { CreateCongressInput, UpdateCongressInput } from '../dto/congress.input';

@Injectable()
export class CongressService {
  constructor(@InjectModel(Congress.name) private congressModel: Model<Congress>) {}

  async findAll(): Promise<Congress[]> {
    return this.congressModel.find().exec();
  }

  async findById(id: string): Promise<Congress> {
    const congress = await this.congressModel.findById(id)
      .populate({
        path: 'members',
        populate: {
          path: 'party',
          model: 'Party'
        }
      })
      .exec();

    if (!congress) {
      throw new NotFoundException(`Congress with ID ${id} not found`);
    }

    return congress;
  }

  async create(input: CreateCongressInput): Promise<Congress> {
    const newCongress = new this.congressModel({
      ...input,
      members: input.memberIds?.map(id => new Types.ObjectId(id)),
      sessions: input.sessionIds?.map(id => new Types.ObjectId(id)),
    });
    return newCongress.save();
  }

  async update(id: string, input: UpdateCongressInput): Promise<Congress> {
    const existingCongress = await this.congressModel.findByIdAndUpdate(
      id,
      {
        ...input,
        members: input.memberIds?.map(id => new Types.ObjectId(id)),
        sessions: input.sessionIds?.map(id => new Types.ObjectId(id)),
      },
      { new: true }
    ).exec();
    if (!existingCongress) {
      throw new NotFoundException(`Congress with ID ${id} not found`);
    }
    return existingCongress;
  }

  async delete(id: string): Promise<Congress> {
    const deletedCongress = await this.congressModel.findByIdAndDelete(id).exec();
    if (!deletedCongress) {
      throw new NotFoundException(`Congress with ID ${id} not found`);
    }
    return deletedCongress;
  }
}
