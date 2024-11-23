import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart.component';
import { MaterialModule } from '../../share/material/material.module';
import { PartsModule } from '../../share/parts/parts.module';
import { AuthGuard } from '../../share/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: CartComponent,
  canActivate: [AuthGuard],
  runGuardsAndResolvers: 'always',
}];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PartsModule,
    RouterModule.forChild(routes),
  ]
})
export class CartModule { }
