import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Data } from '../helpers/enum';
import { baseUrl } from './url/baseUrl';
import { endPoint } from './url/apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  addCategory(
    category_name: string,
    category_description: string
  ): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    const body = { category_name, category_description };

    return this.http.post(baseUrl.base + endPoint.addCategory, body, {
      headers,
    });
  }

  getCategories(): Observable<Data> {
    const token = sessionStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.post<Data>(
      baseUrl.base + endPoint.listOfCategory,
      {},
      { headers }
    );
  }

  deleteCategory(id: number): Observable<Data> {
    const token = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    const urlWithId = `${baseUrl.base}/${id}`;

    return this.http.delete<Data>(urlWithId, { headers });
  }

  updateCategory(
    id: number,
    category_name: string,
    category_description: string
  ): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    const body = { category_name, category_description };
    const urlWithId = `${baseUrl.base + endPoint.editCategory}}/${id}`;

    return this.http.put(urlWithId, body, { headers });
  }
}
