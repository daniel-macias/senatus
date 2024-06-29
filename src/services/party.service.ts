import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Party } from '../schemas/party.schema';
import { CreatePartyInput, UpdatePartyInput } from '../dto/party.input';

@Injectable()
export class PartyService {
  constructor(@InjectModel(Party.name) private partyModel: Model<Party>) {}

  async findAll(): Promise<Party[]> {
    return this.partyModel.find().exec();
  }

  async findById(id: string): Promise<Party> {
    const party = await this.partyModel.findById(id).exec();
    if (!party) {
      throw new NotFoundException(`Party with ID ${id} not found`);
    }
    return party;
  }

  async create(input: CreatePartyInput): Promise<Party> {
    const newParty = new this.partyModel(input);
    return newParty.save();
  }

  async update(id: string, input: UpdatePartyInput): Promise<Party> {
    const existingParty = await this.partyModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!existingParty) {
      throw new NotFoundException(`Party with ID ${id} not found`);
    }
    return existingParty;
  }

  async delete(id: string): Promise<Party> {
    const deletedParty = await this.partyModel.findByIdAndDelete(id).exec();
    if (!deletedParty) {
      throw new NotFoundException(`Party with ID ${id} not found`);
    }
    return deletedParty;
  }
}
