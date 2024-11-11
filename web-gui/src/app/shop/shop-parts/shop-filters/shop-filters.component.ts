import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { FilterChanged, FilterInterface, FilterType } from '../../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { getMakes, getModels } from 'car-info';
import { FiltersComponent } from '../../../share/filters/filters.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.scss'
})
export class ShopFiltersComponent implements AfterViewInit, OnDestroy {
  @ViewChild(FiltersComponent) filtersComponent: FiltersComponent;

  readonly filters$ = new BehaviorSubject<FilterInterface[]>([
    { name: 'brand', showName: 'Марка', type: FilterType.ENUM_FILTER, enum: getMakes() },
    { name: 'carBrand', showName: 'Модель', type: FilterType.ENUM_FILTER },
    { name: 'name', showName: 'Название', type: FilterType.STRING_FILTER },
    { name: 'quantity', showName: 'Количество', type: FilterType.NUMBER_FILTER },
    { name: 'partCode', showName: 'Парткод', type: FilterType.NUMBER_FILTER },
    { name: 'vin', showName: 'Вин номер', type: FilterType.STRING_FILTER },
    { name: 'type', showName: 'Тип', type: FilterType.STRING_FILTER },
    { name: 'price', showName: 'Цена', type: FilterType.NUMBER_FILTER },
  ]);

  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.subscriptions.add(this.filtersComponent.viewFilters.find(viewFilter => viewFilter.filter.name === 'brand')
    .formFilter.valueChanges.subscribe(value => {
      this.filters$.next(this.filters$.value.map(filter => filter.name === 'carBrand'
        ? {...filter, enum: this.getModelsCar(value)} as FilterInterface
        : filter));
      console.log(this.filters$.value);
    }));
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  setParams(values: Record<string, any>): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: values});
  }

  resetParams(): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {}, queryParamsHandling: 'merge' });
  }

  private getModelsCar(carBrand: string): string[] {
    if (!carBrand.length) {
      return [];
    }
    return getModels(carBrand);
  }
}
