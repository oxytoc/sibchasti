import { Module } from '@nestjs/common';

import { ClientManagerController } from './client-manager.controller';
import { ClientManagerService } from './client-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client])
  ],
  controllers: [ClientManagerController],
  providers: [ClientManagerService],
  exports: [ClientManagerModule]
})
export class ClientManagerModule {}
