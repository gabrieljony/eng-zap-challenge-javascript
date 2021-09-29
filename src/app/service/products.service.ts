import { ProductObject } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string = "http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json"

  minlon = -46.693419;
  minlat = -23.568704;
  maxlon = -46.641146;
  maxlat = -23.546686;

  constructor(private http: HttpClient) { }

  getListProducts(type: string) {
    return this.http
      .get<any>(this.url)
      .toPromise()
      .then((response: ProductObject[]) => {
        response = this.ineligibilityLatLon(response);
        if (type === 'zap') {
          response = response.filter(item =>
            item.pricingInfos.businessType === 'SALE' && Number(item.pricingInfos.price) >= 600000 - 600000 * (this.boundingBox(item.address.geoLocation.location) ? 0.1 : 0) ||
            item.pricingInfos.businessType === 'RENTAL' && Number(item.pricingInfos.rentalTotalPrice) >= 3500)
          response = this.eligibilityAreas(response);
        } else if (type === 'vivareal') {
          response = response.filter(item =>
            item.pricingInfos.businessType === 'SALE' && Number(item.pricingInfos.price) <= 700000 ||
            item.pricingInfos.businessType === 'RENTAL' && Number(item.pricingInfos.rentalTotalPrice) <= 4000 + 4000 * (this.boundingBox(item.address.geoLocation.location) ? 0.5 : 0))
          response = this.eligibilityValue(response);
        }
        return response;
      });
  }

  ineligibilityLatLon(list: ProductObject[]): ProductObject[] {
    return list.filter(item => !(item.address.geoLocation.location.lat === 0 && item.address.geoLocation.location.lon === 0))
  }

  eligibilityAreas(list: ProductObject[]): ProductObject[] {
    return list.filter(item => item.pricingInfos.businessType === 'SALE' && item.usableAreas > 0 && Number(item.pricingInfos.price) / item.usableAreas > 3500)
  }

  eligibilityValue(list: ProductObject[]): ProductObject[] {
    return list.filter(item => {
      console.log('1 - ', Number(item.pricingInfos.monthlyCondoFee), ' - ', item.usableAreas)
      // console.log('2 - ', !(Number(item.pricingInfos.monthlyCondoFee) >= 0.3 * Number(item.pricingInfos.rentalTotalPrice)))
      return !Number.isNaN(Number(item.pricingInfos.monthlyCondoFee)) && !(Number(item.pricingInfos.monthlyCondoFee) >= 0.3 * Number(item.pricingInfos.rentalTotalPrice))
    })
  }

  boundingBox(location: { lon: number, lat: number }): boolean {
    let result = location.lon >= this.minlon && location.lon <= this.maxlon && location.lat >= this.minlat && location.lon <= this.maxlat;
    return result
  }
}
