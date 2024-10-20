import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const ROUTES: Routes = [
  { path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
]

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: ROUTES,
    runGuardsAndResolvers: 'always',
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: '**', component: PageNotFoundComponent }, 
];
