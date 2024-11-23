import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, Subscription, of, onErrorResumeNextWith } from 'rxjs';

import { Part } from '../../interfaces';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop-parts',
  templateUrl: './shop-parts.component.html',
  styleUrl: './shop-parts.component.scss'
})
export class ShopPartsComponent implements OnInit, OnDestroy {
  private _updateParts = new BehaviorSubject<any>({});
  parts$: Observable<Part[]> = this._updateParts.pipe(
    switchMap(params => this.service.getParts(params)),
    onErrorResumeNextWith(of([])),
  );

  subscription: Subscription = new Subscription();

  constructor(
    private service: ApiService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.router.queryParams.subscribe(params => {
      this._updateParts.next(params);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
