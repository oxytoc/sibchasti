import { Body, Controller, Get, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Observable } from 'rxjs';

import { CreatePartDto } from './dto/create-part.dto';
import { PartsManagerService } from './parts-manager.service';
import { Part } from './entity/part.entity';


@Controller('')
export class PartsManagerController {
  constructor(private partsManager: PartsManagerService) { }

  @Get()
  getAllParts() {
    return this.partsManager.getAllParts();
  }

  @UseInterceptors(FileInterceptor('partImage'))
  @Post()
  create(
    @Body() createPartDto: CreatePartDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 100000
        })
        .build(),
    )
    file?: Express.Multer.File,
  ): Observable<Part> {
    return this.partsManager.createPart(createPartDto, file);
  }

  @Post('/delete')
  delete(@Body() partIds: number[]) {
    this.partsManager.deleteParts(partIds);
    return;
  }
}
