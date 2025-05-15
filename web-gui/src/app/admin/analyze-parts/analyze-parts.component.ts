import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { DailyForecast, PartForecast } from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ForecastComponent } from './forecast/forecast.component';

@Component({
  selector: 'app-analyze-parts',
  templateUrl: './analyze-parts.component.html',
  styleUrl: './analyze-parts.component.scss'
})
export class AnalyzePartsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<PartForecast> = new MatTableDataSource();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateDataSource$: Observable<PartForecast[]> = this._update.asObservable()
    .pipe(
      tap(() => this._isLoading.next(true)),
      switchMap(() => this.service.getForecastDemands()),
    )

  displayedColumns: string[] = [ 'id', 'partName' ];
  
  sub: Subscription = new Subscription();

  form: FormGroup = this.formBuilder.group({
    period: new FormControl(null),
  })

  constructor (
    private service: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
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
  
  makePredictForecast(): void {
    const period: number = this.form.get('period')?.value;
    this.sub.add(this.service.makePredictForecast(period).subscribe(
      () => {
        this._update.next(true);
      }
    ));
  }

  retrainPredictForecast(): void {
    this.sub.add(this.service.retrainForecast().subscribe());
  }

  openForecastDialog(row: DailyForecast): void {
    this.dialog.open(ForecastComponent, {
      // maxWidth: '35vw'
      data: row
    }).afterClosed()
    .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
