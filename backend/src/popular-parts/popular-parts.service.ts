import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { spawn } from 'child_process';

import { Order } from 'src/order-manager/entity/order.entity';
import { CreatePopularPartDto } from './dto/create-popolar-part.dto';
import { PopularPart } from './entity/popular-part.entity';

export interface PartIdWithDate {
  partId: number;
  date: number;
}

@Injectable()
export class PopularPartsService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(PopularPart) private readonly popularPartRepository: Repository<PopularPart>
  ) { }

  async getPopularParts() {
    return this.popularPartRepository.find({});
  }

  async getPartsOrderedByDate(createPopularPartDto: CreatePopularPartDto): Promise<PartIdWithDate[]> {
    const dateFrom = createPopularPartDto.dateFrom;
    const dateTill = createPopularPartDto.dateTill;
    const orders = await this.orderRepository.find({
      order: {
        orderDate: "ASC",
      },
      where: {
        orderDate: Between(new Date(dateFrom).toISOString(), new Date(dateTill).toISOString()),
      }
    });
    if (!orders) {
      throw new NotFoundException(`Orders between ${new Date(createPopularPartDto.dateFrom), new Date(createPopularPartDto.dateTill)} not found`);
    }
    let partIdsWithDate: PartIdWithDate[] = [];
    orders.forEach(o => 
      partIdsWithDate =[...partIdsWithDate, ...o.partQuantities.map(pq => ({
        partId: pq.part.id,
        date: Date.parse(o.orderDate)
      }))]
    );
    return partIdsWithDate;
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

    return null;

    // return new Promise((resolve, reject) => {
    //   const pythonProcess = spawn('python', ['/app/backend/utils/predict.py']);
      
    //   let output = '';
    //   let error = '';

    //   pythonProcess.stdout.on('data', (data) => {
    //     output += data.toString();
    //   });

    //   pythonProcess.stderr.on('data', (data) => {
    //     error += data.toString();
    //   });

    //   pythonProcess.on('close', (code) => {
    //     if (code === 0) {
    //       try {
    //         const result = JSON.parse(output);
    //         resolve(result);
    //       } catch (err) {
    //         reject(`Error parsing JSON: ${err.message}`);
    //       }
    //     } else {
    //       reject(`Python process exited with code ${code}: ${error}`);
    //     }
    //   });

    //   pythonProcess.stdin.write(JSON.stringify(orders));
    //   pythonProcess.stdin.end();
    // });
  }
}
