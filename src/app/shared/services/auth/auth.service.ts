import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Environments} from '../../base/Environments'
import { UserDataLogin, UserDataSignup } from '../../interfaces/user-data';
import { tokenUser } from '../../interfaces/token-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userTokenData: BehaviorSubject<tokenUser | null> = new BehaviorSubject<tokenUser | null>(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('userToken') !== null) {
        this.getToken()
        _Router.navigate([localStorage.getItem('currentPage')])
      }
    }
  }

  postSignUpAPI(userData: UserDataSignup):Observable<any> {
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/auth/signup`, userData);
  }
  postLoginAPI(userData: UserDataLogin):Observable<any> {
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/auth/signin`, userData);
  }
  getToken():void {
    if (localStorage.getItem('userToken') !== null) {
      this.userTokenData.next(jwtDecode(localStorage.getItem('userToken')!))
      console.log(this.userTokenData);
    }
  }
  sendEmailAPI(email: string): Observable<any> {
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/auth/forgotPasswords`, email);
  }
  sendCodeAPI(code: string): Observable<any> {
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/auth/verifyResetCode`, code);
  }
  resetDataAPI(userData: any): Observable<any> {
    return this._HttpClient.put(`${Environments.baseUrl}/api/v1/auth/resetPassword`, userData);
  }
}
