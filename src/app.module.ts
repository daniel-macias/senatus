import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Congress, CongressSchema } from './schemas/congress.schema';
import { CongressResolver } from './resolvers/congress.resolver';
import { CongressService } from './services/congress.service';

import { Member, MemberSchema } from './schemas/member.schema';
import { MemberResolver } from './resolvers/member.resolver';
import { MemberService } from './services/member.service';

import { Party, PartySchema } from './schemas/party.schema';
import { PartyResolver } from './resolvers/party.resolver';
import { PartyService } from './services/party.service';

import { Session, SessionSchema } from './schemas/session.schema';
import { SessionResolver } from './resolvers/session.resolver';
import { SessionService } from './services/session.service';

import { Poll, PollSchema} from './schemas/poll.schema';
import { PollResolver } from './resolvers/poll.resolver';
import { PollService } from './services/poll.service';

import { Vote, VoteSchema } from './schemas/vote.schema';
import { VoteResolver } from './resolvers/vote.resolver';
import { VoteService } from './services/vote.service';

import { SocialMedia } from './types/socialMedia.type';
import { SocialMediaInput } from './dto/socialMedia.input';

import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Congress.name, schema: CongressSchema },
      { name: Member.name, schema: MemberSchema},
      { name: Party.name, schema: PartySchema},
      { name: Session.name, schema: SessionSchema},
      { name: Poll.name, schema: PollSchema},
      { name: Vote.name, schema: VoteSchema}
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: 
  [CongressResolver, CongressService, 
   MemberService, MemberResolver,
   PartyService, PartyResolver,
   SessionService, SessionResolver,
   PollService, PollResolver,
   VoteService, VoteResolver,
   SocialMedia, SocialMediaInput]
   
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Connected to MongoDB successfully!');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Failed to connect to MongoDB: ${err.message}`);
    });
  }
}
