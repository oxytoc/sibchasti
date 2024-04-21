import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PopularPartsService } from './popular-parts.service';
import { CreatePopularPartDto } from './dto/create-popolar-part.dto';

@Controller('popularParts')
export class PopularPartsController {
  constructor(private readonly popularPartsService: PopularPartsService) { }

  @Get()
  getPopularParts() {
    return this.popularPartsService.getPopularParts();
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  createPopularPart(@Body() createPopularPartDto: CreatePopularPartDto) {
    return this.popularPartsService.createPopularParts(createPopularPartDto);
  }
}
