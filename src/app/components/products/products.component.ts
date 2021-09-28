import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  collectionProducts = new Array()

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    await this.productsService.getListProducts().then((item) => {
      this.collectionProducts = item;

      console.log(this.collectionProducts);
    });
  }

}
