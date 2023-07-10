import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { TokenCache } from './token.cache';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: '127.0.0.1',
        port: 6379,
        password: 'guest',
      },
    }),
  ],
  providers: [TokenCache],
  exports: [TokenCache],
})
export class RedisCacheModule {}
