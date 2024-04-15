import { Module } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { OrderManagerController } from './order-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Client } from 'src/client-manager/entity/client.entity';
import { Part } from 'src/parts-manager/entity/part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Client, Part])
  ],
  controllers: [OrderManagerController],
  providers: [OrderManagerService],
  exports: [OrderManagerModule]
})
export class OrderManagerModule {}
