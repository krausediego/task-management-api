import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { TokenCache } from '../cache/redis/token.cache';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [AuthController],
  providers: [TokenCache, JwtService],
})
export class ControllersModule {}
