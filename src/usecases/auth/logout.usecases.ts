import { ITokenCache } from 'src/domain/cache/token.interface';

export class LogoutUseCases {
  constructor(private readonly tokenCache: ITokenCache) {}

  async disconnectAccount(id: string): Promise<void> {
    await this.tokenCache.deleteToken(id);
  }
}
