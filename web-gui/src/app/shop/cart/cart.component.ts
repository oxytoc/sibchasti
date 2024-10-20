import { Component, OnDestroy } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';

import { AddedPartsToCartEventService } from '../../share/services/added-parts-to-cart-event.service';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Part } from '../../interfaces';

interface CartPart {
  id: number;
  partImageUrl: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy {
  displayedColumns: string[] = ['select', 'partImageUrl', 'description', 'price', 'quantity'];
  dataSource: MatTableDataSource<CartPart> = new MatTableDataSource();

  subscription: Subscription = new Subscription();

  private parts: Part[] = [];

  private cartParts = this.addedPartsToCartEventService.changed$.pipe(
    filter(parts => !!parts),
    tap(parts => {
      this.parts = parts;
      this.dataSource.data = parts.map(part => ({
        id: part.id,
        description: part.description,
        price: part.price,
        quantity: part.quantity,
        partImageUrl: `${this.service.baseUrl}/databaseFile/${part.partImageId}`
      }));
  })
);
  selection = new SelectionModel<CartPart>(true, []);

  constructor(
    private addedPartsToCartEventService: AddedPartsToCartEventService,
    private service: ApiService,
  ) {
    this.subscription = this.cartParts.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  buy() {
    const choosenParts: Part[] = this.parts.filter(part =>
      this.selection.selected.find(cartPart => cartPart.id === part.id)
    );

    // create order, need auth user to create
  }
}
