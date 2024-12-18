import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ErrorDialogModule { }
