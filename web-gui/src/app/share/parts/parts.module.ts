import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../share/material/material.module';
import { PartsComponent } from './parts.component';
import { PartComponent } from './part/part.component';


@NgModule({
  declarations: [
    PartsComponent,
    PartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    PartsComponent,
    PartComponent,
  ],
})
export class PartsModule { }
