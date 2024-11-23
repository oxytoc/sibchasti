import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ShopComponent } from './shop.component';
import { MaterialModule } from '../share/material/material.module';


const SHOP_ROUTES: Routes = [
  { path: '', loadChildren: () => import('./shop-parts/shop-parts.module').then(m => m.ShopPartsModule) },
  // { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  // { path: 'part/:id', loadChildren: () => import('./detail-part/detail-part.module').then(m => m.DetailPartModule) },
]

export const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: SHOP_ROUTES,
  },
];

@NgModule({
  declarations: [
    ShopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
})
export class ShopModule { }
