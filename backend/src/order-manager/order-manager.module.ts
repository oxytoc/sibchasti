import { Module } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { OrderManagerController } from './order-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Part } from 'src/parts-manager/entity/part.entity';
import { PartQuantity } from './entity/part-quantity.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Part, PartQuantity]),
    AuthModule,
    UserModule
  ],
  controllers: [OrderManagerController],
  providers: [OrderManagerService],
  exports: [OrderManagerModule]
})
export class OrderManagerModule {}
