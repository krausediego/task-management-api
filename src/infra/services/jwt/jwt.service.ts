import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtPayload } from 'src/domain/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string, secret: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token, { secret });
    return decode;
  }

  createExpirationToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn?: string | number,
  ): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createToken(payload: IJwtPayload, secret: string): string {
    return this.jwtService.sign(payload, { secret });
  }

  decode(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
