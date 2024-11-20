import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchError, from, Observable, switchMap, tap } from 'rxjs';

import { DatabaseFile } from './database-file.entity';

 
@Injectable()
export class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}
 
  uploadDatabaseFile(dataBuffer: Buffer, filename: string): Observable<DatabaseFile> {
    const newFile = this.databaseFilesRepository.create({
      filename,
      data: dataBuffer
    });
    return from(this.databaseFilesRepository.save(newFile));
  }

  updateDatabaseFile(dataBuffer: Buffer, filename: string, fileId: number): Observable<DatabaseFile> {
    return from(this.databaseFilesRepository.preload({
      id: +fileId,
      filename,
      data: dataBuffer
    })).pipe(
      catchError(() => { throw new NotFoundException(`File ${fileId} not found`); }),
      switchMap(file => {
        if (!file) {
          throw new NotFoundException();
        }
        return from(this.databaseFilesRepository.save(file));
      })
    );
  }
 
  getFileById(fileId: number): Observable<DatabaseFile> {
    return from(this.databaseFilesRepository.findOne({ where: { id: fileId } })).pipe(
      catchError(() => { throw new NotFoundException(`File ${fileId} not found`); }),
      tap(file => {
        if (!file) {
          throw new NotFoundException();
        }
      })
    );
  }
}