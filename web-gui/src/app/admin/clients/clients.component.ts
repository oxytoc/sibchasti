import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, filter, switchMap, tap } from 'rxjs';

import { User } from '../../interfaces';
import { ApiService } from '../../services/api.service';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateDataSource$: Observable<User[]> = this._update.asObservable()
    .pipe(
      tap(() => this._isLoading.next(true)),
      switchMap(() => this.service.getUsers()),
    )

  displayedColumns: string[] = ['select', 'id', 'secondName','firstName', 'thirdName', 'phoneNumber'];
  selection = new SelectionModel<User>(true, []);
  
  sub: Subscription = new Subscription();

  constructor (
    private service: ApiService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.sub.add(
      this.updateDataSource$
      .subscribe(clients => {
        this._isLoading.next(false)
        this.dataSource = new MatTableDataSource(clients);
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

  deleteClients(): void {
    this.sub.add(this.service.deleteUsers(this.selection.selected).subscribe(
      () => {
        this.selection.clear();
        this._update.next(true);
      }
    ));
  }

  createClient(): void {
    this.dialog.open(CreateClientDialogComponent, {
      maxWidth: '260px'
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
