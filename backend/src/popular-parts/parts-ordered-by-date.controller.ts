import { Body, Controller, Post } from '@nestjs/common';
import { PopularPartsService } from './popular-parts.service';

import { CreatePopularPartDto } from './dto/create-popolar-part.dto';

@Controller('partsOrderedByDate')
export class PartsOrderedByDateController {
  constructor(private readonly popularPartsService: PopularPartsService) { }

  @Post()
  getPartsOrderedByDate(@Body() getPartsOrderedByDate: CreatePopularPartDto) {
    return this.popularPartsService.getPartsOrderedByDate(getPartsOrderedByDate);
  }
}
