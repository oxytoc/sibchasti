import { Component } from '@angular/core';

import { FilterChanged, FilterInterface, FilterType } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.scss'
})
export class ShopFiltersComponent {
  readonly filters: FilterInterface[] = [
    { name: 'brand', showName: 'Бренд', type: FilterType.STRING_FILTER },
    { name: 'carBrand', showName: 'Бренд авто', type: FilterType.STRING_FILTER },
    { name: 'name', showName: 'Название', type: FilterType.STRING_FILTER },
    { name: 'quantity', showName: 'Колличество', type: FilterType.NUMBER_FILTER },
    { name: 'partCode', showName: 'Парткод', type: FilterType.NUMBER_FILTER },
    { name: 'vin', showName: 'Вин номер', type: FilterType.STRING_FILTER },
    { name: 'type', showName: 'Тип', type: FilterType.STRING_FILTER },
    { name: 'price', showName: 'Цена', type: FilterType.NUMBER_FILTER },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  setParams(values: Record<string, any>): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: values});
  }

  resetParams(): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {}, queryParamsHandling: 'merge' });
  }
}
