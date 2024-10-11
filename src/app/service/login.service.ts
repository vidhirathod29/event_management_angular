import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './url/baseUrl';
import { endPoint } from './url/apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post(baseUrl.base + endPoint.login, body);
  }
}
