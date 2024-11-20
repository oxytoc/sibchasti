import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

import { Order, OrderStatus } from './entity/order.entity';
import { Part } from 'src/parts-manager/entity/part.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PartQuantity } from './entity/part-quantity.entity';
import { User } from 'src/user/entities/user.entity';
import { CloseOrderDto } from './dto/close-orde.dto';
import { AuthService } from 'src/auth/auth.service';
import { MakeUserOrderDto } from './dto/make-user-order.dto';
import { UserService } from 'src/user/user.service';

export interface ActualUserOrder {
  orderStatus: OrderStatus,
  clientId: number,
  partQuantities: PartQuantity[],
  id: number,
  orderDate: string
}

@Injectable()
export class OrderManagerService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly clientRepository: Repository<User>,
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
    @InjectRepository(PartQuantity) private readonly partQuantityRepository: Repository<PartQuantity>,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  loadPartById(partIds: number[]): Observable<Part[]> {
    return from(this.partRepository.find({where: {id: In(partIds)}})).pipe(
      map(part => {
        if (!part) {
          throw new NotFoundException(`Parts not found`);
        }
        return part;
      })
    );
  }

  loadClientById(clientId: number): Observable<User> {
    return from(this.clientRepository.findOne({where: {id: clientId}})).pipe(
      map(client => {
        if (!client) {
          throw new NotFoundException(`Client ${clientId} not found`);
        }
        return client;
      })
    );

  }

  private findOrders(ids: number[]): Observable<ActualUserOrder[]> {
    return from(this.orderRepository.find({ where: { id: In(ids) } })).pipe(
      catchError(() => { throw new NotFoundException(`Order not found`); }),
      map(orders => {
        if (!orders.length) {
          throw new NotFoundException(`Orders not found`);
        }
        return this.makeOrdersToActualOrders(orders);
      })
    );
  }

  private makeOrdersToActualOrders(orders: Order[]): ActualUserOrder[] {
    return orders.map(order => ({
      orderStatus: order.orderStatus,
      clientId: order.client.id,
      partQuantities: order.partQuantities,
      id: order.id,
      orderDate: order.orderDate
    }));
  }

  private findOrdersByClient(client: User): Observable<ActualUserOrder[]> {
    return from(this.orderRepository.find({ where: { client: client } })).pipe(
      catchError(() => { throw new NotFoundException(`Order not found`); }),
      map(orders => {
        if (!orders.length) {
          throw new NotFoundException(`Orders not found`);
        }
    
        return this.makeOrdersToActualOrders(orders);
      })
    );
  }

  createOrder(orderDto: CreateOrderDto): Observable<ActualUserOrder> {
    return from(this.loadClientById(+orderDto.clientId)).pipe(
      switchMap(client => {
        const partIds = orderDto.partQuantity.map(pq => +pq.partId);
        return this.loadPartById(partIds).pipe(
          switchMap(parts => {
            const vaildParts = parts.filter(part => {
              const orderPart = orderDto.partQuantity.find(p => +p.partId === part.id);
              return orderPart.quantity > 0 && part.quantity - orderPart.quantity >= 0;
            });
            return from(Promise.all(orderDto.partQuantity.map(pq => {
              const part = vaildParts.find(p => +pq.partId === p.id);
              return this.partQuantityRepository.create({ part, quantity: pq.quantity  });
            }))).pipe(
              switchMap(partQuantities => {
                const order = this.orderRepository.create({
                  partQuantities,
                  client,
                  orderStatus: orderDto.orderStatus ? orderDto.orderStatus : OrderStatus.open
                });
                return from(this.orderRepository.save(order)).pipe(
                  map(orders => this.makeOrdersToActualOrders([orders])[0])
                );
              })
            );
          })
        );
      })
    );
  }

  deleteOrders(ids: number[]): Observable<ActualUserOrder[]> {
    return from(this.orderRepository.find({ where: {id: In(ids) }})).pipe(
      map(order => this.makeOrdersToActualOrders(order))
    );
  }

  closeOrder(closeOrderDto: CloseOrderDto): Observable<ActualUserOrder> {
    return this.findOrders([Number(closeOrderDto.orderId)]).pipe(
      switchMap(order => {
        return from(this.orderRepository.preload({
          orderStatus: OrderStatus.closed,
          ...order[0],
        })).pipe(map(order => this.makeOrdersToActualOrders([order])[0]));
      }));
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  makeUserOrder(makeOrderDto: MakeUserOrderDto, token: string): Observable<ActualUserOrder> {
    if (!token) { return(of(null)); }

    return this.authService.verifyToken(token).pipe(
      catchError(error => { throw new NotFoundException(`User not found, error - ${error}`); }),
      switchMap(tokensAndUser => {
        const order: CreateOrderDto = {
          clientId: tokensAndUser.userId,
          partQuantity: makeOrderDto.partQuantity,
          orderStatus: makeOrderDto.orderStatus
        };
        return this.createOrder(order);
      })
    );
  }

  getUserOrders(token: string): Observable<ActualUserOrder[]> {
    if (!token) { return(of(null)); }

    return this.authService.verifyToken(token).pipe(
      catchError(error => { throw new NotFoundException(`User not found, error - ${error}`); }),
      switchMap(tokensAndUser => {
        return this.userService.viewUser(Number(tokensAndUser.userId));
      }),
      switchMap(user => this.findOrdersByClient(user))
    );
  }
}
