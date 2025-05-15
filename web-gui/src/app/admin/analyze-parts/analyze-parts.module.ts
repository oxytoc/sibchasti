import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AnalyzePartsComponent } from './analyze-parts.component';
import { ForecastPipe } from '../../common/forecast.pipe';
import { ForecastComponent } from './forecast/forecast.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {path: '', component: AnalyzePartsComponent },
  { path: 'forecast', component: ForecastComponent }
];

@NgModule({
  declarations: [
    AnalyzePartsComponent,
    ForecastComponent
  ],
  providers: [provideNativeDateAdapter()],
  imports: [
    NgxChartsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    ForecastPipe
  ]
})
export class AnalyzePartsModule { }
