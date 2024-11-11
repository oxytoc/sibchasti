import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForecastsService } from './forecasts.service';

@Controller('')
export class ForecastController {
  constructor(private readonly forecastsService: ForecastsService) { }

  @Get()
  getForecasts() {
    return this.forecastsService.getForecasts();
  }

  @Post("predictForecast")
  getPredictForecast(@Body() periodDTO: { period: number }) {
    return this.forecastsService.getPredictForecast(periodDTO.period);
  }

  @Post("retrainForecast")
  retrainForecast() {
    return this.forecastsService.retrain();
  }
}
