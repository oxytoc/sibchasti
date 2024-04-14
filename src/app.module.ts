import { Module } from '@nestjs/common';
import { PartsManagerModule } from './parts-manager/parts-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionSource } from './dataSource';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PartsManagerModule,
    TypeOrmModule.forRoot(ConnectionSource)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
