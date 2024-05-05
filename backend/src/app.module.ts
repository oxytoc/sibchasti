import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionSource } from './dataSource';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { ClientManagerModule } from './client-manager/client-manager.module';
import { PopularPartsModule } from './popular-parts/popular-parts.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    ClientManagerModule,
    PopularPartsModule,
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
          }
        ]
      }
    ])
  ]
})
export class AppModule {}
