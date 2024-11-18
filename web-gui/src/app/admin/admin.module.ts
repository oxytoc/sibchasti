import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../share/guards/auth.guard';
import { AdminGuard } from '../share/guards/admin.guard';


const AUTH_ROUTES = [
  { path: 'parts', loadChildren: () => import('./parts/parts.module').then(m => m.AdminPartsModule) },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'popular-parts', loadChildren: () => import('./analyze-parts/analyze-parts.module').then(m => m.AnalyzePartsModule) },
]

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminGuard],
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
