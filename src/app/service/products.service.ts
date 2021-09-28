import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getListProducts() {
    return this.http
      .get<any>('assets/source-1.json')
      .toPromise()
      .then((response) => {
        return response;
      });
  }
}
