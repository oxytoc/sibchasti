import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';

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
    component: MainComponent,
    children: AUTH_ROUTES,
    runGuardsAndResolvers: 'always',
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];
