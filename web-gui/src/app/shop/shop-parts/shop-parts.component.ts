import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, Subscription } from 'rxjs';

import { Part } from '../../interfaces';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop-parts',
  templateUrl: './shop-parts.component.html',
  styleUrl: './shop-parts.component.scss'
})
export class ShopPartsComponent implements OnInit, OnDestroy {
  private _updateParts = new BehaviorSubject<Record<string, any>>({});
  parts$: Observable<Part[]> = this._updateParts.pipe(switchMap(params => this.service.getParts(params)));

  subscription: Subscription = new Subscription();

  constructor(
    private service: ApiService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.router.queryParams.subscribe(params => {
      console.log(params);
      this._updateParts.next(params);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
