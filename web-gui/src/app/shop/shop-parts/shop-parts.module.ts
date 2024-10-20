import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPartsComponent } from './shop-parts.component';
import { MaterialModule } from '../../share/material/material.module';
import { FiltersModule } from '../../share/filters/filters.module';
import { CartDialogComponent } from '../cart/cart-dialog/cart-dialog.component';
import { CartComponent } from '../cart/cart.component';
import { PartComponent } from './parts/part/part.component';
import { PartsComponent } from './parts/parts.component';
import { ShopFiltersComponent } from './shop-filters/shop-filters.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ShopPartsComponent }];

@NgModule({
  declarations: [
    ShopPartsComponent,
    PartsComponent,
    PartComponent,
    ShopFiltersComponent,
    CartComponent,
    CartDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FiltersModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ShopPartsComponent,
    PartsComponent,
    PartComponent,
    ShopFiltersComponent,
    CartComponent,
    CartDialogComponent,
  ],
})
export class ShopPartsModule { }
