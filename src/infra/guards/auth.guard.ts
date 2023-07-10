import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ITokenCache } from 'src/domain/cache/token.interface';
import { TokenCache } from '../cache/redis/token.cache';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenCache)
    private readonly tokenCache: ITokenCache,
    @Inject(JwtService)
    private readonly jwt: IJwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const decode = this.jwt.decode(token);

    const { id } = decode as any;

    const cachedToken = await this.tokenCache.getToken(id);

    if (!cachedToken || token !== cachedToken) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
