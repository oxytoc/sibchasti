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
  @IsString()
    carModel: string;

  @ApiProperty()
  @IsString()
    description: string;

  @ApiProperty()
  @IsNumber()
    quantity: number;

  @ApiProperty()
  @IsNumber()
    article: number;

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
