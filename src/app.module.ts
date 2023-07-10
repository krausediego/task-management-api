import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from './infra/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infra/controllers/controllers.module';
import { BcryptModule } from './infra/services/bcrypt/bcrypt.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { JwtTokenModule } from './infra/services/jwt/jwt.module';
import { RedisCacheModule } from './infra/cache/redis/redis-cache.module';

@Module({
  imports: [
    UseCasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    ExceptionsModule,
    JwtTokenModule,
    RedisCacheModule,
  ],
})
export class AppModule {}
