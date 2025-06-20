import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean = false;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  login(username: string, password: string): Observable<any> {
    return this.http
          .post(`${environment.apiUrl}/api/auth/login`, {
            username,
            password
          });
  }

  setToken(token: string): void {
    if(this.isBrowser){
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if(this.isBrowser){
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if(this.isBrowser){
      return this.getToken() !== null;
    }
    return false;
  }

  logout(): void {
    if(this.isBrowser){
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Redirect to login page
    }
  }
}
