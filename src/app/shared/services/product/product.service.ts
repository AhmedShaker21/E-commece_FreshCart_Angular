import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../../base/Environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(productId: string): Observable<any>{
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/products/${productId}`)
  }
}
