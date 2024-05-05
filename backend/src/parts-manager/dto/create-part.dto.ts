import { IsNumber, IsString } from "class-validator";

export class CreatePartDto {
  @IsString()
    name: string;
  @IsString()
    brand: string;
  @IsNumber()
    quantity: number;
  @IsNumber()
    partCode: number;
  @IsString()
    vin: string;
  @IsString()
    type: string;
  @IsNumber()
    price: number;
}
