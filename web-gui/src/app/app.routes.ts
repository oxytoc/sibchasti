import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const ROUTES: Routes = [
  { path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'promo', loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule) },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'cart', loadChildren: () => import('./shop/cart/cart.module').then(m => m.CartModule) },
  { path: 'personal', loadChildren: () => import('./personal-page/personal-page.module').then(m => m.PersonalPageModule) },
  { path: 'part/:id', loadChildren: () => import('./shop/detail-part/detail-part.module').then(m => m.DetailPartModule) },
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
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
