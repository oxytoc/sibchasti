import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './entity/client.entity';
import { CreateClientDto } from './dto/create-client.dto';


@Injectable()
export class ClientManagerService {
  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>
  ) { }

  async createClient(clientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(clientDto);
    try {
      return this.clientRepository.save(client);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  getAllClient(): Promise<Client[]> {
    return this.clientRepository.find({});
  }
}
