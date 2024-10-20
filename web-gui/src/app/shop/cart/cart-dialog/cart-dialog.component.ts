import { Component, Inject } from '@angular/core';
import { AddedPartsToCartEventService } from '../../added-parts-to-cart-event.service';
import { map, Observable } from 'rxjs';
import { ObjectInformation, Part } from '../../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent {
  readonly columns = {
    firstRow: ['brand'],
    secondRow: ['index'],
  };

  readonly cartParametersDisplayedColumns: string[] = ['parameter', 'value'];
  // dataSource: Observable<ObjectInformation[]> = this.addedPartsToCartEventService.changed$.pipe(map(parts => {
  //   return parts.map((part, index) => Object.keys(part).map(key => ({
  //     parameter: key,
  //     value: part[`${key}`]
  //   })))
  // }))

  constructor(
    private addedPartsToCartEventService: AddedPartsToCartEventService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
  ) { }

  isBuyDisable(): boolean {
    return false;
  }

  buyParts(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
