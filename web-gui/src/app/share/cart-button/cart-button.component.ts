import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AddedPartsToCartEventService } from '../services/added-parts-to-cart-event.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss'
})
export class CartButtonComponent {
  cartQuantity$ = this.addedPartsToCartEventService.changed$.pipe(map(parts => parts?.length));

  constructor(
    private addedPartsToCartEventService: AddedPartsToCartEventService,
    private router: Router
  ) {}

  openCart(): void {
    this.router.navigate(['/cart']);
  }
}
