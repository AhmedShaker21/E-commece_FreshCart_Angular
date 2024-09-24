import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environments } from '../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  // wishlist: BehaviorSubject<number> = new BehaviorSubject(0);
  wishCount: BehaviorSubject<any> = new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) { }
  AddProductToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${Environments.baseUrl}/api/v1/wishlist`,
      {
        "productId": productId
      }
    )
  }
  getLoggedWishlist(): Observable<any> {
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/wishlist`)
  }
  removeWishlist(pID:string): Observable<any> {
    return this._httpClient.delete(`${Environments.baseUrl}/api/v1/wishlist/${pID}`)
  }
}
