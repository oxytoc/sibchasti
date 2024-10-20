import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [CartButtonComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CartButtonComponent]
})
export class CartButtonModule { }
