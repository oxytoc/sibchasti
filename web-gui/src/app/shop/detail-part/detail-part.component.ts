import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, Observable, Subscription, switchMap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { ObjectInformation, Part, PartQuantity, TranlatedKeyPart } from '../../interfaces';
import { AddedPartsToCartEventService } from '../../share/services/added-parts-to-cart-event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail-part',
  templateUrl: './detail-part.component.html',
  styleUrl: './detail-part.component.scss'
})
export class DetailPartComponent implements OnDestroy {
  readonly parametersDisplayedColumns: string[] = ['parameter', 'value'];
  dataSource: ObjectInformation[] = [];
  partImageId = '';
  private subscription: Subscription;
  part: Part = null;
  private _loading = new BehaviorSubject(true);
  loading$ = this._loading.asObservable();
  similarParts$: Observable<Part[]> = this.authService.userId$.pipe(
    filter(id => !!id),
    switchMap(id => this.service.getPersonalOffers(Number(id)))
  );

  constructor(
    activateRoute: ActivatedRoute,
    private authService: AuthService,
    private service: ApiService,
    private addedPartsToCartEventService: AddedPartsToCartEventService,
  ) {
    this._loading.next(true);
    this.subscription = activateRoute.params
      .pipe(
        switchMap(params => this.service.getParts({ id: params["id"] })),
      )
      .subscribe(part=> {
        this.part = part[0];
        this.partImageId = `${this.service.baseUrl}/databaseFile/${part[0].partImageId}`
        this.dataSource = Object.keys(part[0]).filter(key => Object.keys(TranlatedKeyPart).includes(key))
          .map((partKey) => ({
            // @ts-ignore 
            parameter: TranlatedKeyPart[partKey],
            // @ts-ignore 
            value: this.part[partKey]
          }));
        this._loading.next(false);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addPartToCart(): void {
    const pq: PartQuantity = {
      partId: this.part.id,
      quantity: 1
    }
    this.addedPartsToCartEventService.addPartToCart(pq);
  }
}
