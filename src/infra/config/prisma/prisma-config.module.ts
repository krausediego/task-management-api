import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['query', 'error', 'warn'],
        },
      }),
    }),
  ],
})
export class PrismaConfigModule {}
