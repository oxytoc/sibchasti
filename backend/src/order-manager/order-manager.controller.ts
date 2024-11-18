import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CloseOrderDto } from './dto/close-orde.dto';
import { Private, Public } from 'src/auth/public-stragegy';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';


@Controller('')
export class OrderManagerController {
  constructor(private orderManager: OrderManagerService) { }

  @Get()
  @Public()
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
}
