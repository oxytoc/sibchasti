import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePartDto {
  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsString()
    brand: string;

  @ApiProperty()
  @IsNumber()
    quantity: number;

  @ApiProperty()
  @IsNumber()
    partCode: number;

  @ApiProperty()
    @IsString()
    vin: string;

  @ApiProperty()
    @IsString()
    type: string;

  @ApiProperty()
    @IsNumber()
    price: number;
}
