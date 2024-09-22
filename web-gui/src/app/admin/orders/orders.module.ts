import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { OrdersComponent } from './orders.component';
import { PartQuantityPipe } from '../../common/part-quantity.pipe';
import { CreateOrderDialogComponent } from './create-order-dialog/create-order-dialog.component';
import { MaterialModule } from '../../share/material/material.module';

const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  declarations: [OrdersComponent, CreateOrderDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PartQuantityPipe,
    MatSelectModule,
    MatIconModule
  ]
})
export class OrdersModule { }
