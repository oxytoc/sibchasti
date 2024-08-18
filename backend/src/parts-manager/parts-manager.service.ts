import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

import { Part } from './entity/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { DatabaseFilesService } from 'src/shared/database-file/database-file.service';


@Injectable()
export class PartsManagerService {
  constructor(
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
    private readonly databaseFilesService: DatabaseFilesService,
  ) { }

  createPart(partDto: CreatePartDto, file: Express.Multer.File): Observable<Part> {
    const parImage = this.databaseFilesService.uploadDatabaseFile(file.buffer, file.fieldname);
    return from(parImage).pipe(
      switchMap(file => {
        const part = this.partRepository.create({...partDto, partImageId: file.id});
        return from(this.partRepository.save(part))
          .pipe(
            catchError(err => {
              throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Error from server. Please try again later or contact support',
              }, HttpStatus.FORBIDDEN, {
                cause: err
              });
            })
          )
      })
    );
  }

  updatePart(id: string, partDto: UpdatePartDto, file: Express.Multer.File): Observable<Part> {
    if (!!partDto.partImageId) {
      const parImage = this.databaseFilesService.updateDatabaseFile(file.buffer, file.fieldname, partDto.partImageId);
      return from(parImage).pipe(
        switchMap(file => {
          return from(this.partRepository.preload({
            id: +id,
            partImageId: file.id,
            ...partDto,
          })).pipe(
            catchError(error => { throw new NotFoundException(`Part ${id} not found`); }),
            switchMap(part => from(this.partRepository.save(part)))
          );
        })
      );
    }
    return from(this.partRepository.preload({
      id: +id,
      ...partDto,
    })).pipe(
      catchError(error => { throw new NotFoundException(`Part ${id} not found`); }),
      switchMap(part => from(this.partRepository.save(part)))
    );
  }

  deleteParts(ids: number[]): Observable<Part[]> {
    return from(this.partRepository.find({ where: {id: In(ids) }})).pipe(
      switchMap(parts => from(this.partRepository.remove(parts)))
    );
  }

  findPart(id: number): Observable<Part> {
    return from(this.partRepository.findOne({ where: { id: id } })).pipe(
      catchError(error => { throw new NotFoundException(`Part ${id} not found`); }),
      map(part => {
        if (!part) {
          throw new NotFoundException(`Part ${id} not found`);
        }
    
        return part;
      })
    );
  }

  getAllParts(): Observable<Part[]> {
    return from(this.partRepository.find({}));
  }
}
