import { Module } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { OrderManagerController } from './order-manager.controller';

@Module({
  controllers: [OrderManagerController],
  providers: [OrderManagerService],
  exports: [OrderManagerModule]
})
export class OrderManagerModule {}
