import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Part } from './entity/part.entity';
import { CreatePartDto } from './dto/create-part.dto';

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
      console.log(error);
    }
  }

  getAllParts(): Promise<Part[]> {
    return this.partRepository.find({})
  }
}
