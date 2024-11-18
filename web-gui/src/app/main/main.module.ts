import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../share/material/material.module';
import { AddedPartsToCartEventService } from '../share/services/added-parts-to-cart-event.service';
import { AuthDialogModule } from '../share/auth-dialog/auth-dialog.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    HttpClientModule,
    MaterialModule,
    RouterLink,
    AuthDialogModule
  ],
  exports: [MainComponent],
  providers: [AddedPartsToCartEventService]
})
export class MainModule { }
