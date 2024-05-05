import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

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

  async deleteClients(ids: number[]): Promise<Client[]> {
    const client = await this.clientRepository.find({ where: {id: In(ids) }});

    return this.clientRepository.remove(client);
  }

  private async findClient(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id: +id } });

    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }

    return client;
  }
}
