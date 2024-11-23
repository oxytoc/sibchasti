import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Part, PartQuantity } from '../../../interfaces';
import { ApiService } from '../../../services/api.service';
import { AddedPartsToCartEventService } from '../../services/added-parts-to-cart-event.service';


@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss'
})
export class PartComponent {
  @Input() set setPart(part: Part) {
    this.part = part;
    this.imageUrl = `${this.baseUrl}/databaseFile/${part.partImageId}`
    this._loading.next(false);
  };
  private baseUrl = this.service.baseUrl;
  imageUrl = '';

  part: Part = null;
  private _loading = new BehaviorSubject<boolean>(true);
  loading$ = this._loading.asObservable();

  constructor(
    private service: ApiService,
    private cartService: AddedPartsToCartEventService,
    private router: Router
  ) { }

  addPartToCart(): void {
    const pq: PartQuantity = {
      partId: this.part.id,
      quantity: 1
    }
    this.cartService.addPartToCart(pq);
  }

  redirectToDetailPart(part: Part): void {
    this.router.navigate([`/part/${part.id}`])
  }
}
