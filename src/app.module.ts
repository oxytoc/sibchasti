import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionSource } from './dataSource';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { ClientManagerModule } from './client-manager/client-manager.module';
import { PopularPartsModule } from './popular-parts/popular-parts.module';

@Module({
  imports: [
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    ClientManagerModule,
    PopularPartsModule,
  ]
})
export class AppModule {}
