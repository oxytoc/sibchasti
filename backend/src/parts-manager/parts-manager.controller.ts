import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartsManagerService } from './parts-manager.service';

@Controller('')
export class PartsManagerController {
  constructor(private partsManager: PartsManagerService) { }

  @Get()
  getAllParts() {
    return this.partsManager.getAllParts();
  }

  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    this.partsManager.createPart(createPartDto);
    return createPartDto;
  }

  @Post('/delete')
  delete(@Body() partIds: number[]) {
    this.partsManager.deleteParts(partIds);
    return;
  }
}
