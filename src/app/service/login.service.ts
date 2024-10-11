import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'https://e-commerce-wd7i.onrender.com/api/user/login';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    
    return this.http.post(this.apiUrl, body);
  }
}
