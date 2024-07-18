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

  async findById(id: string): Promise<any> {
    const member = await this.memberModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'parties',
          localField: 'party',
          foreignField: '_id',
          as: 'partyDetails',
        },
      },
      {
        $unwind: {
          path: '$partyDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          party: {
            _id: '$partyDetails._id',
            name: '$partyDetails.name',
            ideology: '$partyDetails.ideology',
            color: '$partyDetails.color',
            leader: '$partyDetails.leader',
            founded: '$partyDetails.founded',
            headquarters: '$partyDetails.headquarters',
            website: '$partyDetails.website',
            photoUrl: '$partyDetails.photoUrl',
          },
          position: 1,
          photoUrl: 1,
          startDate: 1,
          endDate: 1,
          bio: 1,
        },
      },
    ]).exec();

    if (!member || member.length === 0) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    return member[0];
  }

  async findAllWithParty(): Promise<any[]> {
    return this.memberModel.aggregate([
      {
        $lookup: {
          from: 'parties',
          localField: 'party',
          foreignField: '_id',
          as: 'partyDetails',
        },
      },
      {
        $unwind: '$partyDetails',
      },
      {
        $project: {
          name: 1,
          party: {
            _id: '$partyDetails._id',
            name: '$partyDetails.name',
            ideology: '$partyDetails.ideology',
            color: '$partyDetails.color',
            leader: '$partyDetails.leader',
            founded: '$partyDetails.founded',
            headquarters: '$partyDetails.headquarters',
            website: '$partyDetails.website',
            photoUrl: '$partyDetails.photoUrl',
          },
          position: 1,
          photoUrl: 1,
          startDate: 1,
          endDate: 1,
          bio: 1,
        },
      },
    ]).exec();
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
