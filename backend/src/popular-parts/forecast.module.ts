import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForecastController } from './forecasts.controller';
import { ForecastsService } from './forecasts.service';
import { Forecast } from './entity/forecast.entity';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Forecast])
  ],
  controllers: [ForecastController],
  providers: [ForecastsService]
})
export class ForecastsModule {}
