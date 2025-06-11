import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public loggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient, private storageService: StorageService) {
    this.userSubject = new BehaviorSubject(
      this.storageService.getItem('access_token') ?
        JSON.parse(this.storageService.getItem('access_token')!) : null
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http
      .post<User>(`${environment.apiUrl}/api/auth/login`, body)
      .pipe(
        map((user) => {
          this.storageService.setItem('access_token', JSON.stringify(user));
          this.userSubject.next(user);
          this.loggedIn = true;
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.storageService.removeItem('access_token');
    this.loggedIn = false;
    this.userSubject.next(null);
    //this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.userId) {
          this.logout();
        }
        return x;
      })
    );
  }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/token`, { headers: { 'Authorization': `Bearer ${token}` } })

  }
}
