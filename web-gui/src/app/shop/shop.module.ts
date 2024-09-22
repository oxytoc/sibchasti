import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './parts/parts.component';
import { PartComponent } from './parts/part/part.component';
import { MaterialModule } from '../share/material/material.module';
import { FiltersModule } from '../share/filters/filters.module';
import { ShopFiltersComponent } from './shop-filters/shop-filters.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    // children: SHOP_ROUTES,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [
    ShopComponent,
    PartsComponent,
    PartComponent,
    ShopFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FiltersModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
