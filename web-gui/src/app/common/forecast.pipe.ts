import { Pipe, PipeTransform } from '@angular/core';

import { Forecast, PartQuantity } from '../interfaces';

@Pipe({
  name: 'forecast',
  standalone: true
})
export class ForecastPipe implements PipeTransform {

  transform(forecast: Forecast[]): string {
    let result = '';
    forecast.forEach(p => {
      result += `ID Запчасти - ${p.partId}, Продажи по месяцам - ${p.demands} \n `;
    });
    return result;
  }

}
