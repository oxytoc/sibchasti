import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export interface PartQuantityInterface {
  partId: string;
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
    orderDate: string;

  @IsNumber()
    clientId: string;

  @IsArray()
  @ValidateNested({ each: true })
    partQuantity: PartQuantityInterface[];
}
