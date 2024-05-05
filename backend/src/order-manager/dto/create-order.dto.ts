import { IsArray, IsNumber, ValidateNested } from "class-validator";

export interface PartQuantityInterface {
  partId: string;
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
    clientId: string;

  @IsArray()
  @ValidateNested({ each: true })
    partQuantity: PartQuantityInterface[];
}
