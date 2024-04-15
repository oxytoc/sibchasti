import { IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
    firstName: string;
  @IsString()
    secondName: string;
  @IsString()
    thirdName: string;
  @IsString()
    phoneNumber: string;
}
