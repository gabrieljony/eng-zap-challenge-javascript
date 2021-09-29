import { ProductObject } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string = "http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json"

  constructor(private http: HttpClient) { }

  getListProducts(type: string) {
    return this.http
      .get<any>(this.url)
      .toPromise()
      .then((response: ProductObject[]) => {
        console.log(response)
        if (type === 'zap') {
          return response.filter(item =>
            item.pricingInfos.businessType === 'SALE' && Number(item.pricingInfos.price) >= 600000 ||
            item.pricingInfos.businessType === 'RENTAL' && Number(item.pricingInfos.rentalTotalPrice) >= 3500)
        } else if (type === 'vivareal') {
          return response.filter(item =>
            item.pricingInfos.businessType === 'SALE' && Number(item.pricingInfos.price) <= 700000 ||
            item.pricingInfos.businessType === 'RENTAL' && Number(item.pricingInfos.rentalTotalPrice) <= 4000)
        }
        return response;
      });
  }
}
