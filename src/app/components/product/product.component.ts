import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import { ProductObject } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: string;
  portal: string;
  sub: Subscription;
  product: ProductObject;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.portal = params['slug'];
      }
    )
    console.log('this.portal', this.portal)
    console.log('this.id', this.id)
    this.product = this.productsService.findProducts(this.id);
    console.log('this.product', this.product)
    if (!this.product) {
      console.log('!this.product', !this.product)

    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
