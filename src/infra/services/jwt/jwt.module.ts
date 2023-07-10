import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [Jwt.register({})],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
