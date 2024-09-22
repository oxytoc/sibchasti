import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { PredictParts } from '../../interfaces';

@Component({
  selector: 'app-analyze-parts',
  templateUrl: './analyze-parts.component.html',
  styleUrl: './analyze-parts.component.scss'
})
export class AnalyzePartsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<PredictParts> = new MatTableDataSource();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateDataSource$: Observable<PredictParts[]> = this._update.asObservable()
    .pipe(
      tap(() => this._isLoading.next(true)),
      switchMap(() => this.service.getPopularParts()),
    )

  displayedColumns: string[] = ['id', 'timeSeries', 'predicts', 'errors' ];
  
  sub: Subscription = new Subscription();

  form: FormGroup = this.formBuilder.group({
    dateFrom: new FormControl(null),
    dateTill: new FormControl(null),
  })

  constructor (
    private service: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngAfterViewInit(): void {
    this.sub.add(
      this.updateDataSource$
      .subscribe(predParts => {
        this._isLoading.next(false)
        this.dataSource = new MatTableDataSource(predParts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  createPopularParts(): void {
    const dateFrom: Date = this.form.get('dateFrom')?.value as Date;
    const dateTill: Date = this.form.get('dateTill')?.value as Date;
    this.sub.add(this.service.createPopularParts(dateFrom, dateTill).subscribe());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
