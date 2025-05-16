import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../share/material/material.module';
import { AboutUsComponent } from './about-us.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
  },
];


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class AboutUsModule { }
