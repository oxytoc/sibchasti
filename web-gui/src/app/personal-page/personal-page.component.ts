import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatus, Part } from '../interfaces';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface PersonalOrder {
  partImageUrl: string;
  description: string;
  price: number;
  orderDate: string;
  orderStatus: OrderStatus;
}

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent {
  displayedColumns: string[] = ['partImageUrl', 'description', 'price', 'orderDate', 'orderStatus'];
  dataSource: MatTableDataSource<PersonalOrder> = new MatTableDataSource();

  subscription: Subscription = new Subscription();

  personalOrders$ = this.service.getUserOrders().pipe(
    tap(orders => {
      // const partIds = orders.flatMap(order => order.partQuantities).map(pq => pq.partId);
      this.dataSource.data = orders.flatMap(order => order.partQuantities.map(pq => ({
        id: pq.part.id,
        partImageUrl: `${this.service.baseUrl}/databaseFile/${pq.part.partImageId}`,
        description: pq.part.description,
        price: pq.part.price,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        orderStatus: order.orderStatus,
      })))
    })
  );

  parts$: Observable<Part[]> = this.authService.userId$.pipe(
    filter(id => !!id),
    switchMap(id => this.service.getPersonalOffers(Number(id)))
  );
  userId$ = this.authService.userId$;

  constructor(
    private service: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  redirectToDetailPart(part: Part): void {
    this.router.navigate([`/part/${part.id}`])
  }
}
