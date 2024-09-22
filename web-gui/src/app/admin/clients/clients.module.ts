import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';
import { MaterialModule } from '../../share/material/material.module';


@NgModule({
  declarations: [
    ClientsComponent,
    CreateClientDialogComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ClientsModule { }
