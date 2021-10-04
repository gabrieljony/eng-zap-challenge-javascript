import { ProductComponent } from './../product/product.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: ':slug/:id',
    component: ProductComponent,
  },
  {
    path: ':slug',
    component: ProductsComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
