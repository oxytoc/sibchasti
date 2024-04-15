import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Part } from './entity/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsManagerService {
  constructor(
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
  ) { }

  async createPart(partDto: CreatePartDto): Promise<Part> {
    const part = this.partRepository.create(partDto);
    try {
      return this.partRepository.save(part);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async updatePart(id: string, partDto: UpdatePartDto): Promise<Part> {
    const part = await this.partRepository.preload({
      id: +id,
      ...partDto
    });

    if (!part) {
      throw new NotFoundException(`Part ${id} not found`);
    }
    return this.partRepository.save(part);
  }

  async deletePart(id: string): Promise<Part> {
    const part = await this.findPart(id);

    return this.partRepository.remove(part);
  }

  async findPart(id: string): Promise<Part> {
    const part = await this.partRepository.findOne({ where: { id: +id } });

    if (!part) {
      throw new NotFoundException(`Part ${id} not found`);
    }

    return part;
  }

  getAllParts(): Promise<Part[]> {
    return this.partRepository.find({});
  }
}
