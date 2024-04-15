import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartsManagerService } from './parts-manager.service';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
export class PartsManagerController {
  constructor(private partsManager: PartsManagerService) { }

  @Get()
  getAllParts() {
    return this.partsManager.getAllParts();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const coffee = this.partsManager.findPart(id);
    return coffee;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createPartDto: CreatePartDto) {
    this.partsManager.createPart(createPartDto);
    return createPartDto;
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePart: UpdatePartDto) {
    return this.partsManager.updatePart(id, updatePart);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    this.partsManager.deletePart(id);
    return 'success';
  }
}
