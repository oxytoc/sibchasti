import { IsString } from "class-validator";

export class CreatePopularPartDto {
  @IsString()
    dateFrom: string;
  @IsString()
    dateTill: string;
}
