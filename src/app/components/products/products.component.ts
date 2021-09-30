import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  collectionProducts = new Array();
  products = new Array();
  portal: string;
  page: number;
  sub: Subscription;
  id;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService) { }

  ngOnInit() {
    console.log(this.route.queryParams)
    if (this.route.snapshot.params['slug']) {
      this.portal = this.route.snapshot.params['slug'];
      this.getListProducts(this.portal);
    }

    this.sub = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.page = queryParams['page'];
        this.products = this.collectionProducts.slice((this.page - 1) * 20, 20 * this.page)
        console.log('this.products: ', this.products)
      }
    )

  }

  async getListProducts(portal: string) {
    console.log('portal', portal)
    await this.productsService.getListProducts(portal).then((item) => {
      this.collectionProducts = item;
      this.products = this.collectionProducts.slice((this.page - 1) * 20, 20 * this.page)
      this.loading = false;
    });
  }

  navigateProduct(id: string) {
    this.router.navigate([`/products/${this.portal}`, id], { relativeTo: this.route })
  }

  nextPage() {
    this.router.navigate([`/products/${this.portal}`], { queryParams: { 'page': ++this.page } })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
