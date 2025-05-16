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
  chartData: any[] = []
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: PartForecast
    ) {
      if (this.data?.forecasts?.length) {
      this.chartData = [{
      name: `Прогноз спроса на товар ${data.partName}`,
      series: this.data.forecasts.map(f => ({
        name: f.date,
        value: f.predictedQuantity
      }))
    }]
      }
    }
}
;