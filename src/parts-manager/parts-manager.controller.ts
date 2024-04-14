import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartsManagerService } from './parts-manager.service';

@Controller('parts')
export class PartsManagerController {
  constructor(private partsManager: PartsManagerService) { }

  @Get()
  getAllParts() {
    return this.partsManager.getAllParts();
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createPartDto: CreatePartDto) {
    this.partsManager.createPart(createPartDto)
    return createPartDto;
  }
}
