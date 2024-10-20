import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Part } from '../interfaces';

@Injectable()
export class AddedPartsToCartEventService {
  private _changed = new BehaviorSubject<Part[]>(null);
  changed$ = this._changed.asObservable();

  constructor() { }

  addPartToCart(part: Part) {
    const currentParts = this._changed.getValue() || [];
    const existingPartIndex = currentParts.findIndex(p => p.id === part.id);
    if (existingPartIndex === -1) {
      currentParts.push(part);
    } else {
      currentParts[existingPartIndex].quantity++;
    }
    this._changed.next(currentParts);
  }
}
