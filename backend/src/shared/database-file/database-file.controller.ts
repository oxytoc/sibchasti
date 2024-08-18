import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Readable } from 'stream';
import { Response } from 'express';
import { from, map, Observable } from 'rxjs';

import { DatabaseFilesService } from './database-file.service';


@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFileController {
  constructor(
    private readonly databaseFilesService: DatabaseFilesService
  ) {}
 
  @Get(':id')
  getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response
  ): Observable<StreamableFile> {
    const file$ = this.databaseFilesService.getFileById(id);

    return from(file$).pipe(
      map(file => {
        const stream = Readable.from(file.data);
 
        response.set({
          'Content-Disposition': `inline; filename="${file.filename}"`,
          'Content-Type': 'image'
        })
     
        return new StreamableFile(stream);
      })
    )
  }
}
