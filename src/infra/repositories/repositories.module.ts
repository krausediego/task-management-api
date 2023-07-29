import { Module } from '@nestjs/common';
import {
  DatabaseUserRepository,
  DatabaseTeamMemberRepository,
  DatabaseTeamRepository,
} from './';

import { PrismaConfigModule } from '../config/prisma/prisma-config.module';

@Module({
  imports: [PrismaConfigModule],
  providers: [
    DatabaseUserRepository,
    DatabaseTeamMemberRepository,
    DatabaseTeamRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseTeamMemberRepository,
    DatabaseTeamRepository,
  ],
})
export class RepositoriesModule {}
