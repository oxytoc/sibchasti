import { Module } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { OrderManagerController } from './order-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Part } from 'src/parts-manager/entity/part.entity';
import { PartQuantity } from './entity/part-quantity.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Part, PartQuantity])
  ],
  controllers: [OrderManagerController],
  providers: [OrderManagerService],
  exports: [OrderManagerModule]
})
export class OrderManagerModule {}
