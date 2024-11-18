import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPartsComponent } from './shop-parts.component';
import { MaterialModule } from '../../share/material/material.module';
import { FiltersModule } from '../../share/filters/filters.module';
import { ShopFiltersComponent } from './shop-filters/shop-filters.component';
import { RouterModule, Routes } from '@angular/router';
import { PartsModule } from '../../share/parts/parts.module';

const routes: Routes = [{ path: '', component: ShopPartsComponent }];

@NgModule({
  declarations: [
    ShopPartsComponent,
    ShopFiltersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FiltersModule,
    PartsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ShopPartsComponent,
    ShopFiltersComponent,
  ],
})
export class ShopPartsModule { }
