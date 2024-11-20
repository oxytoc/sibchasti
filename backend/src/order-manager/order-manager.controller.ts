import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { OrderManagerService } from './order-manager.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CloseOrderDto } from './dto/close-orde.dto';
import { Private, Public } from 'src/auth/public-stragegy';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { MakeUserOrderDto } from './dto/make-user-order.dto';
import { extractTokenFromHeader } from 'src/shared/extract-tokens-from-header';


@Controller('')
export class OrderManagerController {
  constructor(private orderManager: OrderManagerService) { }

  @Get()
  @Private()
  @Roles(Role.Admin)
  getAllOrder() {
    return this.orderManager.getAllOrders();
  }

  @Post()
  @Private()
  @Roles(Role.Admin)
  create(@Body() createOrderDto: CreateOrderDto) {
    this.orderManager.createOrder(createOrderDto);
    return createOrderDto;
  }

  @Post('/delete')
  @Private()
  @Roles(Role.Admin)
  delete(@Body() ids: number[]) {
    this.orderManager.deleteOrders(ids);
    return;
  }

  @Post('/closeOrder')
  @Private()
  closeOrder(@Body() closeOrderDto: CloseOrderDto) {
    return this.orderManager.closeOrder(closeOrderDto);
  }

  @Post('/makeUserOrder')
  @Private()
  makeUserOrder(
    @Body() makeOrderDto: MakeUserOrderDto,
    @Req() request: Request) {
      return this.orderManager.makeUserOrder(makeOrderDto, extractTokenFromHeader(request));
  }

  @Get('/getUserOrders')
  @Public()
  getUserOrders(
    @Req() request: Request) {
      return this.orderManager.getUserOrders(extractTokenFromHeader(request));
  }
}
