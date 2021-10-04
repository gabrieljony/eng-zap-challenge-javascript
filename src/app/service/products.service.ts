import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ProductObject } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string;

  private minlon = -46.693419;
  private minlat = -23.568704;
  private maxlon = -46.641146;
  private maxlat = -23.546686;

  private products: ProductObject[];

  constructor(private http: HttpClient) {
    this.url = `${environment.API_URL}`;
  }

  getListProducts(type: string = null) {
    return this.http
      .get<any>(this.url)
      .toPromise()
      .then((response: ProductObject[]) => {
        this.products = response;
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

  private ineligibilityLatLon(list: ProductObject[]): ProductObject[] {
    return list.filter(item => !(item.address.geoLocation.location.lat === 0 && item.address.geoLocation.location.lon === 0))
  }

  private eligibilityAreas(list: ProductObject[]): ProductObject[] {
    return list.filter(item => item.pricingInfos.businessType === 'SALE' && item.usableAreas > 0 && Number(item.pricingInfos.price) / item.usableAreas > 3500)
  }

  private eligibilityValue(list: ProductObject[]): ProductObject[] {
    return list.filter(item => !Number.isNaN(Number(item.pricingInfos.monthlyCondoFee)) && !(Number(item.pricingInfos.monthlyCondoFee) >= 0.3 * Number(item.pricingInfos.rentalTotalPrice)))
  }

  private boundingBox(location: { lon: number, lat: number }): boolean {
    let result = location.lon >= this.minlon && location.lon <= this.maxlon && location.lat >= this.minlat && location.lon <= this.maxlat;
    return result
  }

  findProducts(id: string): ProductObject {
    return this.products ? this.products.find(item => item.id === id) : null;
  }
}
