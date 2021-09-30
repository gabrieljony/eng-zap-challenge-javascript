import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './service/selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // {
      //   enableTracing: false, // <-- debugging purposes only
      //   preloadingStrategy: SelectivePreloadingStrategyService,
      // }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
