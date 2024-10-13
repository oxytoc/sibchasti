import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Order } from './entity/order.entity';
import { Part } from 'src/parts-manager/entity/part.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PartQuantity } from './entity/part-quantity.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderManagerService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly clientRepository: Repository<User>,
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
    @InjectRepository(PartQuantity) private readonly partQuantityRepository: Repository<PartQuantity>,

  ) { }

  private async loadPartById(partId: number): Promise<Part> {
    const part = await this.partRepository.findOne({where: {id: partId}});
    if (!part) {
      throw new NotFoundException(`Part ${partId} not found`);
    }
    return part;
  }

  private async loadClientById(clientId: number): Promise<User> {
    const client = await this.clientRepository.findOne({where: {id: clientId}});
    if (!client) {
      throw new NotFoundException(`Client ${clientId} not found`);
    }
    return client;
  }

  private async findOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: +id } });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const client = await this.loadClientById(+orderDto.clientId);

    const parts = await Promise.all(
      orderDto.partQuantity
        .map(p => this.loadPartById(+p.partId))
    );

    parts.filter(part => {
      const orderPart = orderDto.partQuantity.find(p => +p.partId === part.id);
      return orderPart.quantity > 0 && part.quantity - orderPart.quantity >= 0;
    });

    const partQuantities: PartQuantity[] = await Promise.all(orderDto.partQuantity.map(pq => {
      const part = parts.find(p => +pq.partId === p.id);
      return this.partQuantityRepository.create({ part, quantity: pq.quantity  });
    }));

    const order = this.orderRepository.create({
      partQuantities,
      client
    });

    try {
      return this.orderRepository.save(order);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Internal server error',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async deleteOrders(ids: number[]): Promise<Order[]> {
    const order: Order[] = await this.orderRepository.find({ where: {id: In(ids) }});
    return this.orderRepository.remove(order);
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
