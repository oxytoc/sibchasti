import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsString()
    orderDate: string;

  @IsNumber()
    clientId: string;

  @IsString({ each: true })
    partsId: string[];
}
