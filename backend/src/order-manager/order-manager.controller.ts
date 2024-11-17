import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CloseOrderDto } from './dto/close-orde.dto';

@Controller('')
export class OrderManagerController {
  constructor(private orderManager: OrderManagerService) { }

  @Get()
  getAllOrder() {
    return this.orderManager.getAllOrders();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.orderManager.createOrder(createOrderDto);
    return createOrderDto;
  }

  @Post('/delete')
  delete(@Body() ids: number[]) {
    this.orderManager.deleteOrders(ids);
    return;
  }

  @Post('/closeOrder')
  closeOrder(@Body() closeOrderDto: CloseOrderDto) {
    return this.orderManager.closeOrder(closeOrderDto);
  }
}
