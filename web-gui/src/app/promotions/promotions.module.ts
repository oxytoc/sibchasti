import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../share/material/material.module';

export const routes: Routes = [
  {
    path: '',
    component: PromotionsComponent,
  },
];


@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class PromotionsModule { }
