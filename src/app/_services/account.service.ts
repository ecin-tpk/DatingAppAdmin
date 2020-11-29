import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountSubject: BehaviorSubject<User>;
  public account: Observable<User>;
  private refreshTokenTimeout;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<User>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): User {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/admin/account/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.accountSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    this.http
      .post(
        `${environment.apiUrl}/account/revoke-token`,
        {},
        { withCredentials: true }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  changePassword(id, params) {
    return this.http
      .put(`${environment.apiUrl}/account/${id}/update-password`, params)
      .pipe(
        map((account: User) => {
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);

          return account;
        })
      );
  }

  updateInfo(id, params) {
    if (params.dateOfBirth) {
      params.dateOfBirth = this.getDateOnly(params.dateOfBirth);
    }

    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
      map((account: User) => {
        account = { ...this.accountValue, ...account };
        this.accountSubject.next(account);

        return account;
      })
    );
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${environment.apiUrl}/account/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          localStorage.setItem('access_token', account.jwtToken);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  // Helper methods
  private startRefreshTokenTimer() {
    // Parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // Set a timeout to refresh the token a minute before it expires (14 minutes)
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  getDateOnly(date) {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
}
