import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import * as ARIMA from 'arima';
import { Order } from 'src/order-manager/entity/order.entity';
import { CreatePopularPartDto } from './dto/create-popolar-part.dto';
import { PopularPart } from './entity/popular-part.entity';

@Injectable()
export class PopularPartsService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(PopularPart) private readonly popularPartRepository: Repository<PopularPart>
  ) { }

  async getPopularParts() {
    return this.popularPartRepository.find({});
  }

  async createPopularParts(createPopularPartDto: CreatePopularPartDto) {
    const dateFrom = createPopularPartDto.dateFrom;
    const dateTill = createPopularPartDto.dateTill;
    const orders = await this.orderRepository.find({
      where: {
        orderDate: Between(new Date(dateFrom).toISOString(), new Date(dateTill).toISOString()),
      }
    });
    if (!orders) {
      throw new NotFoundException(`Orders between ${new Date(createPopularPartDto.dateFrom), new Date(createPopularPartDto.dateTill)} not found`);
    }

    const partIds: number[] = [];
    orders.forEach(o => {
      o.partQuantities.forEach(pq => {
        partIds.push(pq.part.id);
      });
    });
    // Synthesize timeseries
    const ts = partIds;

    // Init arima and start training/ verbose is log of stats 
    const autoarima = new ARIMA({ auto: true, verbose: false }).fit(ts);
    const [pred, errs] = autoarima.predict(12);

    const predicts: number[] = (pred as string[]).map(p => Math.floor(Number(p)));
    const errors: number[] = (errs as string[]).map(p => Math.floor(Number(p)));

    const popularParts = this.popularPartRepository.create({
      timeSeries: ts,
      predicts,
      errors
    });

    try {
      return this.popularPartRepository.save(popularParts);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
