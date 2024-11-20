import { Body, Controller, Get, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Observable } from 'rxjs';

import { CreatePartDto } from './dto/create-part.dto';
import { PartsManagerService } from './parts-manager.service';
import { Part } from './entity/part.entity';
import { FindPartsDto } from './dto/find-part.dto';
import { Private, Public } from 'src/auth/public-stragegy';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';


@Controller('')
export class PartsManagerController {
  constructor(private partsManager: PartsManagerService) { }

  @Public()
  @Get()
  getAllParts(@Query() query: FindPartsDto) {
    return this.partsManager.findMany(query);
  }

  @Private()
  @Roles(Role.Admin)
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

  @Private()
  @Roles(Role.Admin)
  @Post('/delete')
  delete(@Body() partIds: number[]) {
    this.partsManager.deleteParts(partIds);
    return;
  }

  @Public()
  @Post('/getById')
  findParts(@Body() idsDto: { id: number[] }) {
    return this.partsManager.findParts(idsDto.id);
  }
}
