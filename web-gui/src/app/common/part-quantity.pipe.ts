import { Pipe, PipeTransform } from '@angular/core';

import { PartQuantity } from '../interfaces';

@Pipe({
  name: 'partQuantity',
  standalone: true
})
export class PartQuantityPipe implements PipeTransform {

  transform(pq: PartQuantity[]): string {
    let result = '';
    pq.forEach(p => {
      result += `ID Запчасти - ${p.partId}, Кол-во ${p.quantity} \n `;
    });
    return result;
  }

}
