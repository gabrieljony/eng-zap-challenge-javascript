import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from '../../service/products.service';
import { ProductComponent } from '../product/product.component';
import { PageLoadingComponent } from '../page-loading/page-loading.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent, PageLoadingComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
