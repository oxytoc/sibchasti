import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PopularPartsController } from './popular-parts.controller';
import { PopularPartsService } from './popular-parts.service';
import { Order } from 'src/order-manager/entity/order.entity';
import { PopularPart } from './entity/popular-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, PopularPart])
  ],
  controllers: [PopularPartsController],
  providers: [PopularPartsService]
})
export class PopularPartsModule {}
