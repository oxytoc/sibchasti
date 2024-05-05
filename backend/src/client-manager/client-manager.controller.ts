import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientManagerService } from './client-manager.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('')
export class ClientManagerController {
  constructor(private readonly clientService: ClientManagerService) { }

  @Get()
  getAllParts() {
    return this.clientService.getAllClient();
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    this.clientService.createClient(createClientDto);
    return createClientDto;
  }

  @Post('/delete')
  delete(@Body() ids: number[]) {
    this.clientService.deleteClients(ids);
  }
}
