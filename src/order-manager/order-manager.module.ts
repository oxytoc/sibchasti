import { Module } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { OrderManagerController } from './order-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrderManagerController],
  providers: [OrderManagerService],
  exports: [OrderManagerModule]
})
export class OrderManagerModule {}
