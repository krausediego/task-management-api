import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './user.repository';
import { PrismaConfigModule } from '../config/prisma/prisma-config.module';

@Module({
  imports: [PrismaConfigModule],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
