import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parts', loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule) },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'popular-parts', loadChildren: () => import('./analyze-parts/analyze-parts.module').then(m => m.AnalyzePartsModule) },
];
