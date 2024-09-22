import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';


const AUTH_ROUTES = [
  { path: 'parts', loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule) },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'popular-parts', loadChildren: () => import('./analyze-parts/analyze-parts.module').then(m => m.AnalyzePartsModule) },
]

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: AUTH_ROUTES,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    CommonModule,
    MatTabsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
