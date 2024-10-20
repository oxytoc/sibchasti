import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { User, Part } from '../../../interfaces';


@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrl: './create-order-dialog.component.scss'
})
export class CreateOrderDialogComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    clientId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
    partQuantity: new FormArray([
      new FormGroup({
        partId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
        quantity: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      }),
    ])
  })
  clients: User[] = []; 
  parts: Part[] = [];

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<CreateOrderDialogComponent>
  ) { }

  ngOnInit(): void {
    this.sub.add(combineLatest([this.service.getUsers(), this.service.getParts({})])
      .subscribe(([clients, parts]) => {
        this.clients = clients; 
        this.parts = parts;
        this._isLoading.next(false);
      }));
  }

  isSavingDisable(): boolean {
    return this.form.invalid;
  }

  createOrder(): void {
    this.service.createOrder(this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
      }
    )
  }

  addPartQuantity(): void {
    (this.form.get('partQuantity') as FormArray).push(
      this.formBuilder.group({
        partId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
        quantity: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      })
    );
  }

  get partQuantityGroups(): FormGroup[] {
    return (this.form.get('partQuantity') as FormArray).controls as FormGroup[];
  }
}
