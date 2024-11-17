import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { OrderStatus } from "../entity/order.entity";

export class CloseOrderDto {
  @ApiProperty()
  @IsNumber()
    orderId: string;

  @ApiProperty()
    orderStatus: OrderStatus;
}
