import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

import { Part } from './entity/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { DatabaseFilesService } from 'src/shared/database-file/database-file.service';
import { FindPartsDto } from './dto/find-part.dto';


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

  findMany(dto: FindPartsDto): Observable<Part[]> {
    const { name, brand, carBrand, quantity, partCode, vin, type, price, search } = dto;
    const conditions: FindOptionsWhere<Part> | FindOptionsWhere<Part>[] = {
      ...(name ? { name } : {}),
      ...(brand? { brand } : {}),
      ...(carBrand? { carBrand } : {}),
      ...(quantity? { quantity } : {}),
      ...(partCode? { partCode } : {}),
      ...(vin? { vin } : {}),
      ...(type? { type } : {}),
      ...(price? { price } : {}),
    };

    const queryBuilder = this.partRepository.createQueryBuilder('part');
    name && queryBuilder.andWhere('part.name = :name', { name });
    brand && queryBuilder.andWhere('part.brand = :brand', { brand });
    carBrand && queryBuilder.andWhere('part.carBrand = :carBrand', { carBrand });
    quantity && queryBuilder.andWhere('part.quantity = :quantity', { quantity });
    partCode && queryBuilder.andWhere('part.partCode = :partCode', { partCode });
    vin && queryBuilder.andWhere('part.vin = :vin', { vin });
    type && queryBuilder.andWhere('part.type = :type', { type });
    price && queryBuilder.andWhere('part.price = :price', { price });

    if (search) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('LOWER(part.name) LIKE LOWE(:search)', { search: `%${search}%` });
        qb.orWhere('LOWER(part.brand) LIKE LOWE(:search)', { search: `%${search}%` });
        qb.orWhere('LOWER(part.carBrand) LIKE LOWE(:search)', { search: `%${search}%` });
        qb.orWhere('LOWER(part.vin) LIKE LOWE(:search)', { search: `%${search}%` });
        qb.orWhere('LOWER(part.type) LIKE LOWE(:search)', { search: `%${search}%` });
        qb.orWhere('LOWER(part.price) LIKE LOWE(:search)', { search: `%${search}%` });
      }))
    }

    return from(queryBuilder.getMany()).pipe(
      catchError(error => { throw new NotFoundException(`Parts not found`); }),
      map(parts => {
        if (!parts.length) {
          throw new NotFoundException(`Parts not found`);
        }
    
        return parts;
      })
    );
  }


  getAllParts(): Observable<Part[]> {
    return from(this.partRepository.find({}));
  }
}
