import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorInDialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  showErrorMessage(message: any) {
    return this.dialog.open(ErrorDialogComponent, { data: message }).afterClosed();
  }
}
