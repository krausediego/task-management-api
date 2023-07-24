import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtPayload } from 'src/domain/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createExpirationToken(
    payload: IJwtPayload,
    expiresIn?: string | number,
  ): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  createToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload);
  }

  decode(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
