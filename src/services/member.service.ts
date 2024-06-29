import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Member } from '../schemas/member.schema';
import { CreateMemberInput, UpdateMemberInput } from '../dto/member.input';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findById(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async create(input: CreateMemberInput): Promise<Member> {
    const newMember = new this.memberModel({
      ...input,
      party: new Types.ObjectId(input.party),
    });
    return newMember.save();
  }

  async update(id: string, input: UpdateMemberInput): Promise<Member> {
    const existingMember = await this.memberModel.findByIdAndUpdate(
      id,
      {
        ...input,
        party: input.party ? new Types.ObjectId(input.party) : undefined,
      },
      { new: true }
    ).exec();
    if (!existingMember) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return existingMember;
  }

  async delete(id: string): Promise<Member> {
    const deletedMember = await this.memberModel.findByIdAndDelete(id).exec();
    if (!deletedMember) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return deletedMember;
  }
}
