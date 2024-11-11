import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios/dist/http.module';

import { ConnectionSource } from './dataSource';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseFileModule } from './shared/database-file/database-file.module';
import { PersonalOffersModule } from './personal-offers/personal-offers.module';
import { ForecastsModule } from './popular-parts/forecast.module';


@Module({
  imports: [
    HttpModule,
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    ForecastsModule,
    UserModule,
    AuthModule,
    PersonalOffersModule,
    DatabaseFileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'orders',
            module: OrderManagerModule
          }, {
            path: 'forecast',
            module: ForecastsModule
          }, {
            path: 'parts',
            module: PartsManagerModule
          }, {
            path: 'auth',
            module: AuthModule
          }, {
            path: 'users',
            module: UserModule
          }, {
            path: 'databaseFile',
            module: DatabaseFileModule
          }, {
            path: 'personalOffers',
            module: PersonalOffersModule
          }
        ]
      }
    ]),
  ]
})
export class AppModule {}
