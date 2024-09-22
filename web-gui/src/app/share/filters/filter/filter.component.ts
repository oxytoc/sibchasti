import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

import { FilterChanged, FilterInterface, FilterType } from '../../../interfaces';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() filter: FilterInterface = null;
  @Input() set resetFilter(value: any) {
    if (!!value) {
      this.formFilter.patchValue(null);
    }
  };
  @Output() filterChanged = new EventEmitter<FilterChanged>();

  readonly FilterType = FilterType;

  formFilter: FormControl = null;
  subscribtion: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    if (!!this.filter) {
      switch (this.filter.type) {
        case FilterType.STRING_FILTER:
          this.formFilter = new FormControl<string>('');
          break;
        case FilterType.NUMBER_FILTER:
          this.formFilter = new FormControl<number>(null);
          break;
        case FilterType.BOOLEAN_FILTER:
          this.formFilter = new FormControl<boolean>(false);
          break;
        default:
          this.formFilter = new FormControl(null);
      }

      this.subscribtion = this.formFilter.valueChanges
        .pipe(filter(value =>!!value))
        .subscribe(value => this.filterChanged.emit({ name: this.filter.name, value: value }));
    }
    console.log(this.filter);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
