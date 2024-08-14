import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionSource } from './dataSource';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { ClientManagerModule } from './client-manager/client-manager.module';
import { PopularPartsModule } from './popular-parts/popular-parts.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    ClientManagerModule,
    PopularPartsModule,
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'orders',
            module: OrderManagerModule
          }, {
            path: 'clients',
            module: ClientManagerModule
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
          }
        ]
      }
    ])
  ]
})
export class AppModule {}
