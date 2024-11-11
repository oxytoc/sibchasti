import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios/dist/http.module';

import { PersonalOffersService } from './personal-offers.service';
import { PersonalOffersController } from './personal-offers.controller';
import { PartsManagerModule } from 'src/parts-manager/parts-manager.module';
import { Part } from 'src/parts-manager/entity/part.entity';


@Module({
  imports: [
    HttpModule,
    PartsManagerModule,
    TypeOrmModule.forFeature([Part]),
  ],
  controllers: [PersonalOffersController],
  providers: [PersonalOffersService],
  exports: [PersonalOffersModule]
})
export class PersonalOffersModule {}
