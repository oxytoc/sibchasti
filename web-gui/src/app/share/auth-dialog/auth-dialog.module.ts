import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDialogComponent } from './auth-dialog.component';
import { MaterialModule } from '../material/material.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthDialogComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent,
    AuthDialogComponent
  ]
})
export class AuthDialogModule { }
