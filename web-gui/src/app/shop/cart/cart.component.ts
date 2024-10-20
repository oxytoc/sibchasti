import { Component } from '@angular/core';
import { map } from 'rxjs';

import { AddedPartsToCartEventService } from '../added-parts-to-cart-event.service';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartQuantity$ = this.addedPartsToCartEventService.changed$.pipe(map(parts => parts?.length));

  constructor(
    private addedPartsToCartEventService: AddedPartsToCartEventService,
    private dialog: MatDialog
  ) {}

  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      maxWidth: '50vw',
    }).afterClosed()
    .subscribe();
  }
}
