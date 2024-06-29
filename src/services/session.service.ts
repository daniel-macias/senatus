import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from '../schemas/session.schema';
import { CreateSessionInput, UpdateSessionInput } from '../dto/session.input';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findById(id: string): Promise<Session> {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  async create(input: CreateSessionInput): Promise<Session> {
    const newSession = new this.sessionModel({
      ...input,
      polls: input.pollIds?.map(id => new Types.ObjectId(id)),
    });
    return newSession.save();
  }

  async update(id: string, input: UpdateSessionInput): Promise<Session> {
    const existingSession = await this.sessionModel.findByIdAndUpdate(
      id,
      {
        ...input,
        polls: input.pollIds?.map(id => new Types.ObjectId(id)),
      },
      { new: true }
    ).exec();
    if (!existingSession) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return existingSession;
  }

  async delete(id: string): Promise<Session> {
    const deletedSession = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!deletedSession) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return deletedSession;
  }
}
