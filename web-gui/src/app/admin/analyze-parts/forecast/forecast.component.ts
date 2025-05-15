import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PartForecast } from '../../../interfaces';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: PartForecast
    ) { }
  
    get chartData() {
    if (!this.data?.forecasts?.length) return [];

    return [{
      name: 'Прогноз продаж',
      series: this.data.forecasts.map(f => ({
        name: f.date,
        value: f.predictedQuantity
      }))
    }];
  }

  xAxisTickFormatting = (value: string) => {
    return formatDate(value, 'mediumDate', 'ru-RU');
  }
}
