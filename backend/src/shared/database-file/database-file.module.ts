import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFile } from './database-file.entity';
import { DatabaseFilesService } from './database-file.service';
import { DatabaseFileController } from './database-file.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([DatabaseFile])
  ],
  controllers: [DatabaseFileController],
  providers: [DatabaseFilesService],
})
export class DatabaseFileModule {}
