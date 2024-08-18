import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateClientDto {
  @ApiProperty()
  @IsString()
    firstName: string;
  
  @ApiProperty()
  @IsString()
    secondName: string;

  @ApiProperty()
  @IsString()
    thirdName: string;

  @ApiProperty()
  @IsString()
    phoneNumber: string;
}
