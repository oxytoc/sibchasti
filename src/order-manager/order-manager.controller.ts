import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderManagerService } from './order-manager.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order-manager')
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

  @Post(':id')
  update(@Param('id') id: string, @Body() updateOrder: UpdateOrderDto) {
    return this.orderManager.updateOrder(id, updateOrder);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    this.orderManager.deleteOrder(id);
    return 'success';
  }
}
