import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',})
  }
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users/register`, user);
  }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/token`, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  refreshToken() {
    return this.http.post(`${environment.apiUrl}/api/users/token`, { }, httpOptions);
  }
}
