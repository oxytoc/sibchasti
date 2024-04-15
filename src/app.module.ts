import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionSource } from './dataSource';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { ClientManagerModule } from './client-manager/client-manager.module';

@Module({
  imports: [
    PartsManagerModule,
    OrderManagerModule,
    TypeOrmModule.forRoot(ConnectionSource),
    ClientManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
