import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { ConnectionSource } from './dataSource';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { PopularPartsModule } from './popular-parts/popular-parts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseFileModule } from './shared/database-file/database-file.module';


@Module({
  imports: [
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    PopularPartsModule,
    UserModule,
    AuthModule,
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
            path: 'popularParts',
            module: PopularPartsModule
          }, {
            path: 'parts',
            module: PartsManagerModule
          }, {
            path: 'auth',
            module: AuthModule
          }, {
            path: 'user',
            module: UserModule
          }, {
            path: 'databaseFile',
            module: DatabaseFileModule
          }
        ]
      }
    ])
  ]
})
export class AppModule {}
