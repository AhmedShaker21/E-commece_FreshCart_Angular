import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }
  getAllCategories(): Observable<any>{
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/categories`)
  }
  getSpecificCategories(pID:string): Observable<any>{
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/categories/${pID}`)
  }
  getSubCategory(subCatID: string): Observable<any> {
    return this._httpClient.get(`${Environments.baseUrl}/api/v1/categories/${subCatID}/subcategories`)
  }

}

