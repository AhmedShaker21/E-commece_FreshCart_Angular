import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private _httpClient: HttpClient) { }
  checkOut(cardID: string,userData: any): Observable<any>{
    return this._httpClient.post(`${Environments.baseUrl}/api/v1/orders/checkout-session/${cardID}?url=${Environments.localURL}`,

      {
        "shippingAddress": userData
      }
    )
  }
}
