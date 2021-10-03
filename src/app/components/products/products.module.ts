import { InfoProductComponent } from './../info-product/info-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from '../../service/products.service';
import { ProductComponent } from '../product/product.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { PageLoadingComponent } from '../page-loading/page-loading.component';
import { SlideShowComponent } from '../slide-show/slide-show.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent, PageLoadingComponent, PaginationComponent, SlideShowComponent, InfoProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
