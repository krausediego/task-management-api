import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ITokenCache } from 'src/domain/cache/token.interface';

@Injectable()
export class TokenCache implements ITokenCache {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async setExpirationToken(
    id: string,
    expiration: number,
    token: string,
  ): Promise<void> {
    await this.redis.setex(id, expiration, token);
  }

  async setToken(id: string, token: string): Promise<void> {
    await this.redis.set(id, token);
  }

  async getToken(id: string): Promise<string> {
    return this.redis.get(id);
  }

  async deleteToken(id: string): Promise<void> {
    await this.redis.del(id);
  }
}
