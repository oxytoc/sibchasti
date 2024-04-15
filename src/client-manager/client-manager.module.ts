import { Module } from '@nestjs/common';

import { ClientManagerController } from './client-manager.controller';
import { ClientManagerService } from './client-manager.service';

@Module({
  controllers: [ClientManagerController],
  providers: [ClientManagerService],
  exports: [ClientManagerModule]
})
export class ClientManagerModule {}
