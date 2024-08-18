import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CreatePartDto } from "./create-part.dto";

export class UpdatePartDto extends PartialType(CreatePartDto) {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  partImageId: number;
}
