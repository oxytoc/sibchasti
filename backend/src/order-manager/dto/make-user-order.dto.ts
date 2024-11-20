import { ApiProperty } from "@nestjs/swagger";
import { IsArray, isEnum, IsNumber, ValidateNested } from "class-validator";
import { OrderStatus } from "../entity/order.entity";

export interface PartQuantityInterface {
  partId: string;
  quantity: number;
}

export class MakeUserOrderDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
    partQuantity: PartQuantityInterface[];

  @ApiProperty()
    orderStatus: OrderStatus;
}
