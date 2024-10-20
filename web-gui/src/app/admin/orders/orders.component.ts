import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, Subscription, filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

import { Order } from '../../interfaces';
import { CreateOrderDialogComponent } from './create-order-dialog/create-order-dialog.component';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Order> = new MatTableDataSource();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateDataSource$: Observable<Order[]> = this._update.asObservable()
    .pipe(
      tap(() => this._isLoading.next(true)),
      switchMap(() => this.service.getOrders()),
    )

  displayedColumns: string[] = ['select', 'id', 'orderDate', 'clientId', 'partQuantities', 'orderStatus',];
  selection = new SelectionModel<Order>(true, []);
  
  sub: Subscription = new Subscription();

  constructor (
    private service: ApiService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.sub.add(
      this.updateDataSource$
      .subscribe(orders => {
        this._isLoading.next(false)
        this.dataSource = new MatTableDataSource(orders);
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

  deleteOrders(): void {
    this.sub.add(this.service.deleteOrders(this.selection.selected).subscribe(
      () => {
        this.selection.clear();
        this._update.next(true);
      }
    ));
  }

  createOrder(): void {
    this.dialog.open(CreateOrderDialogComponent, {
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
