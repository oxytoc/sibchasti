import { Module } from '@nestjs/common';
import { PartsManagerService } from './parts-manager.service';
import { PartsManagerController } from './parts-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entity/part.entity';
import { DatabaseFile } from 'src/shared/database-file/database-file.entity';
import { DatabaseFilesService } from 'src/shared/database-file/database-file.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Part, DatabaseFile])
  ],
  controllers: [PartsManagerController],
  providers: [PartsManagerService, DatabaseFilesService],
  exports: [PartsManagerModule, PartsManagerService, DatabaseFilesService]
})
export class PartsManagerModule {}
