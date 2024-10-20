import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { Part } from '../../../interfaces';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent implements OnInit, OnDestroy {
  private _updateParts = new BehaviorSubject<Record<string, any>>({});
  parts$: Observable<Part[]> = this._updateParts.pipe(switchMap(params => this.service.getParts(params)));

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
