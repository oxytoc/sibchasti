import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { RefreshTokenStrategyService } from './strategy/refresh-token.strategy.service';
import { AccessTokenStrategyService } from './strategy/access-token.strategy.service';


@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
    AccessTokenStrategyService,
    RefreshTokenStrategyService
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
