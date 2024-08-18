import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export interface PartQuantityInterface {
  partId: string;
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
    clientId: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
    partQuantity: PartQuantityInterface[];
}
