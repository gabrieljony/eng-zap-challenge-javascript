import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  collectionProducts = new Array()

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  ngOnInit() {
    console.log(this.route.queryParams)
    if (this.route.snapshot.params['slug']) {
      this.getListProducts(this.route.snapshot.params['slug'])
    }

  }

  async getListProducts(portal: string) {
    console.log('portal', portal)
    await this.productsService.getListProducts(portal).then((item) => {
      this.collectionProducts = item;

      console.log(this.collectionProducts);
    });
  }

}
