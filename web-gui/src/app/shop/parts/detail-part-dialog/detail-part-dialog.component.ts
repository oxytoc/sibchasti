import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../../../services/api.service';
import { ObjectInformation, Part } from '../../../interfaces';
import { AddedPartsToCartEventService } from '../../added-parts-to-cart-event.service';

@Component({
  selector: 'app-detail-part-dialog',
  templateUrl: './detail-part-dialog.component.html',
  styleUrl: './detail-part-dialog.component.scss'
})
export class DetailPartDialogComponent {
  readonly parametersDisplayedColumns: string[] = ['parameter', 'value'];
  dataSource: ObjectInformation[] = Object.keys(this.data).filter(key => key === 'partImageId' || key === 'name')
    .map((partKey) => ({
      parameter: partKey,
      // @ts-ignore 
      value: this.data[partKey]
    })
  )
  partImageId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Part,
    private dialogRef: MatDialogRef<DetailPartDialogComponent>,
    private service: ApiService,
    private addedPartsToCartEventService: AddedPartsToCartEventService,
  ) {
    this.partImageId = `${this.service.baseUrl}/databaseFile/${this.data.partImageId}`
  }

  addPartToCart(): void {
    this.addedPartsToCartEventService.addPartToCart(this.data);
  }
}
