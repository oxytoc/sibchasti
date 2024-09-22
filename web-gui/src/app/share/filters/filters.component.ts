import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterChanged, FilterInterface } from '../../interfaces';
import { filter, Subject } from 'rxjs';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input() filters: FilterInterface[] = [];
  @Output() filtersChanged = new EventEmitter<Record<string, any>>();
  @Output() filtersResetEvent = new EventEmitter<void>();

  private _filtersValues: Record<string, any> = {};
  private filtersResetValues = new Subject<Object>();
  filtersResetValues$ = this.filtersResetValues.asObservable().pipe(filter(value => !!value));

  constructor() { }

  setFilter(changed: FilterChanged): void {
    this._filtersValues[changed.name] = changed.value;
  }

  clearFilters(): void {
    this._filtersValues = {};
    this.filtersResetValues.next({});
    this.filtersResetEvent.emit();
  }

  applyFilters(): void {
    this.filtersChanged.emit(this._filtersValues);
  }
}
