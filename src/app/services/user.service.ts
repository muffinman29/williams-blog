import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
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
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
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
}
