import { Module } from '@nestjs/common';
import { PartsManagerService } from './parts-manager.service';
import { PartsManagerController } from './parts-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entity/part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Part])
  ],
  controllers: [PartsManagerController],
  providers: [PartsManagerService],
  exports: [PartsManagerModule]
})
export class PartsManagerModule {}
