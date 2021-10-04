import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { ProductsService } from '../../service/products.service';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { PageLoadingComponent } from '../page-loading/page-loading.component';

import { InfoProductComponent } from './../../components/info-product/info-product.component';
import { SlideShowComponent } from './../../components/slide-show/slide-show.component';
import { PaginationComponent } from './../../components/pagination/pagination.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    PageLoadingComponent,
    PaginationComponent,
    SlideShowComponent,
    InfoProductComponent
  ],
  imports: [
    CarouselModule.forRoot(),

    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
