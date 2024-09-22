import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartsComponent } from './parts.component';
import { CreatePartDialogComponent } from './create-part-dialog/create-part-dialog.component';
import { MaterialModule } from '../../share/material/material.module';

const routes: Routes = [{ path: '', component: PartsComponent }];

@NgModule({
  declarations: [
    PartsComponent,
    CreatePartDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PartsModule { }
