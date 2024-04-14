import { IsNumber, IsString } from "class-validator";

export class CreatePartDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsNumber()
  readonly quantity: number;
  @IsNumber()
  readonly partCode: number;
  @IsString()
  readonly vin: string;
  @IsString()
  readonly type: string;
  @IsNumber()
  readonly price: number;
}
