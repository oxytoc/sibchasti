import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Part } from '../../interfaces';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, Observable, Subscription, filter, switchMap, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { CreatePartDialogComponent } from './create-part-dialog/create-part-dialog.component';


@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Part> = new MatTableDataSource();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateDataSource$: Observable<Part[]> = this._update.asObservable()
    .pipe(
      tap(() => this._isLoading.next(true)),
      switchMap(() => this.service.getParts({})),
    )

  displayedColumns: string[] = ['select', 'id', 'brand', 'name', 'carBrand', 'quantity', 'partCode', 'vin', 'type', 'price'];
  selection = new SelectionModel<Part>(true, []);
  
  sub: Subscription = new Subscription();

  constructor (
    private service: ApiService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.sub.add(
      this.updateDataSource$
      .subscribe(parts => {
        this._isLoading.next(false)
        this.dataSource = new MatTableDataSource(parts);
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  deleteParts(): void {
    this.sub.add(this.service.deleteParts(this.selection.selected).subscribe(
      () => {
        this.selection.clear();
        this._update.next(true);
      }
    ));
  }

  createPart(): void {
    this.dialog.open(CreatePartDialogComponent, {
      maxWidth: '40vw'
    }).afterClosed()
    .pipe(filter(value => !!value))
    .subscribe(() => {
      this._update.next(true);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
