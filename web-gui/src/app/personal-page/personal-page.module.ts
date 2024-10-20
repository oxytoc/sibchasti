import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalPageComponent } from './personal-page.component';
import { MaterialModule } from '../share/material/material.module';



@NgModule({
  declarations: [PersonalPageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PersonalPageModule { }
