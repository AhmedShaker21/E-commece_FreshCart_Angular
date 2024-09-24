import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environments } from '../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {
  }
  AddProductToCart(productId: string): Observable<any>{
    return this._httpClient.post(`${Environments.baseUrl}/api/v1/cart`,
      {
        "productId": productId
      }
    )
  }
  updateCartProduct(productId: string, count: string): Observable<any>{

    return this._httpClient.put(`${Environments.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": count
      }
    )
  }
  getLoggedCart(): Observable<any>{
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/cart`)
  }
  removeSpecificCart(productId:string): Observable<any> {
    return this._httpClient.delete(`${Environments.baseUrl}/api/v1/cart/${productId}`)
  }
  clearCart(): Observable<any> {
    return this._httpClient.delete(`${Environments.baseUrl}/api/v1/cart`)
  }

  getUserOrders(userID: string): Observable<any> {
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/orders/user/${userID}`);
  }
}
