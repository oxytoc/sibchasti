import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';

import { AddedPartsToCartEventService } from '../../share/services/added-parts-to-cart-event.service';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Order, OrderStatus, Part, UserOrder } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

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
    switchMap(pqs => {
      const ids = pqs.map(pq => pq.partId);
      return this.service.getPartByIds(ids).pipe(
        map(parts => {
          this.parts = parts;
          this.dataSource.data = parts.map(part => ({
            id: part.id,
            description: part.description,
            price: part.price,
            quantity: pqs.find(pq => pq.partId === part.id).quantity,
            partImageUrl: `${this.service.baseUrl}/databaseFile/${part.partImageId}`
          }));
      })
      );
    })
);
  selection = new SelectionModel<CartPart>(true, []);

  parts$: Observable<Part[]> = this.authService.userId$.pipe(
    filter(id => !!id),
    switchMap(id => this.service.getPersonalOffers(Number(id)))
  );
  userId$ = this.authService.userId$;

  constructor(
    private addedPartsToCartEventService: AddedPartsToCartEventService,
    private service: ApiService,
    private authService: AuthService,
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
    const order: UserOrder = {
      orderStatus: OrderStatus.open,
      partQuantity: this.selection.selected.map(part => ({ partId: part.id, quantity: part.quantity }))
    }

    this.service.makeUserOrder(order).subscribe({
      next: () => {
        this.addedPartsToCartEventService.clearCart();
        this.selection.clear();
      },
      error: (error: any) => console.error('Error creating order:', error)
    });
  }

  incrementPart(element: CartPart): void {
    const part: CartPart = {
      ...element,
      quantity: element.quantity+=1,
    };
    this.dataSource.data = this.dataSource.data.map(data => data.id === part.id ? part : data);
  }

  decrementPart(element: CartPart): void {
    if (element.quantity <= 1) { return; }
    const part: CartPart = {
     ...element,
      quantity: element.quantity-=1
    };
    this.dataSource.data = this.dataSource.data.map(data => data.id === part.id ? part : data);
  }
}
