import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PartQuantity } from '../../interfaces';


@Injectable()
export class AddedPartsToCartEventService {
  private _changed = new BehaviorSubject<PartQuantity[]>(null);
  changed$ = this._changed.asObservable();

  constructor() { }

  addPartToCart(part: PartQuantity) {
    const currentParts = this._changed.getValue() || [];
    const existingPartIndex = currentParts.findIndex(p => p.partId === part.partId);
    if (existingPartIndex === -1) {
      currentParts.push(part);
    } else {
      currentParts[existingPartIndex].quantity++;
    }
    this._changed.next(currentParts);
  }

  removePartFromCart(part: PartQuantity): void {
    const currentParts = this._changed.getValue() || [];
    const updatedParts = currentParts.filter(p => p.partId !== part.partId);
    this._changed.next(updatedParts);
  }

  clearCart(): void {
    this._changed.next([]);
  }
}
