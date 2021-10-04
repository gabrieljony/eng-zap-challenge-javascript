import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private productsService: ProductsService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.portal = params['slug'];
      }
    )
    this.product = this.productsService.findProducts(this.id);
    if (this.product === null) {
      this.router.navigate(['/page-not-found'])
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
