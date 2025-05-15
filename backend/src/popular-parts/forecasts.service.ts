import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';

import { Forecast } from './entity/forecast.entity';

export interface PeriodWithForecast {
  partId: number,
  partName: string,
  forecasts: DateWithForecast[];
}

export interface DateWithForecast {
  date: string,
  predictedQuantity: number
}

@Injectable()
export class ForecastsService {
  constructor(
    @InjectRepository(Forecast) private readonly forecastRepository: Repository<Forecast>,
    private httpService: HttpService,
  ) { }

  async getForecasts() {
    return this.forecastRepository.find({});
  }

  getPredictForecast(period: number): Observable<any> {
    const url = `${process.env.ML_SERVICE_URL}/forecaste`;

    return this.httpService.post<PeriodWithForecast[]>(url, { period: period }).pipe(
      // actual return data: { '1': 'date': '2023-11-01', 'predictedQuantity': 10 } for period: 1
      map((forecastResponse) => forecastResponse.data),
      switchMap(forecast => {
        const forecastCreate = this.forecastRepository.create(forecast);
        return from(this.forecastRepository.save(forecastCreate)).pipe(
          catchError(err => {
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error from server. Please try again later or contact support',
            }, HttpStatus.FORBIDDEN, {
              cause: err
            });
          })
        );
      }),
      catchError((error) => {
        throw new Error(`Failed to get recommendations: ${error}`);
      }));
  }

  retrain(): Observable<string> {
    const url = `${process.env.ML_SERVICE_URL}/retrain-forecast`;

    return this.httpService.post(url, { }).pipe(
      map(retrainAns => retrainAns.data),
      catchError((error) => {
        throw new Error(`Failed to retrain: ${error}`);
      })
    );
  }
}
