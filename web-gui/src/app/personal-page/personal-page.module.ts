import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalPageComponent } from './personal-page.component';
import { MaterialModule } from '../share/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../share/guards/auth.guard';
import { PartsModule } from '../share/parts/parts.module';


export const routes: Routes = [
  {
    path: '',
    component: PersonalPageComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [PersonalPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MaterialModule,
    PartsModule,
  ]
})
export class PersonalPageModule { }
