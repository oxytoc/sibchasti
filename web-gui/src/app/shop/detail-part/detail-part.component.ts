import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { ObjectInformation, Part, TranlatedKeyPart } from '../../interfaces';
import { AddedPartsToCartEventService } from '../../share/services/added-parts-to-cart-event.service';

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

  constructor(
    private activateRoute: ActivatedRoute,
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
    this.addedPartsToCartEventService.addPartToCart(this.part);
  }
}
