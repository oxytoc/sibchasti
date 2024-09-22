import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltersComponent } from './filters.component';
import { FilterComponent } from './filter/filter.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    FiltersComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FiltersComponent,
    FilterComponent
  ]
})
export class FiltersModule { }
