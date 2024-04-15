import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/client-manager/entity/client.entity';
import { Part } from 'src/parts-manager/entity/part.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderManagerService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
  ) { }

  private async loadPartById(partId: number): Promise<Part> {
    const part = await this.partRepository.findOne({where: {id: partId}});
    if (!part) {
      throw new NotFoundException(`Part ${partId} not found`);
    }
    return part;
  }

  private async loadClientById(clientId: number): Promise<Client> {
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
      orderDto.partsId.map(p => this.loadPartById(+p))
    );

    const order = this.orderRepository.create({
      orderDate: orderDto.orderDate,
      parts,
      client
    });

    try {
      return this.orderRepository.save(order);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async updateOrder(id: string, orderDto: UpdateOrderDto): Promise<Order> {
    const client = await this.loadClientById(+orderDto.clientId);

    const parts = await Promise.all(
      orderDto.partsId.map(p => this.loadPartById(+p))
    );

    const order = await this.orderRepository.preload({
      id: +id,
      parts: parts,
      client: client
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return this.partRepository.save(order);
  }

  async deleteOrder(id: string): Promise<Order> {
    const order = await this.findOrder(id);

    return this.orderRepository.remove(order);
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({});
  }
}
