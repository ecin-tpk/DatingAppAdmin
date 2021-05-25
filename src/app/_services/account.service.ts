import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../_models';
import '../_extensions/date-extension';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountSubject: BehaviorSubject<User>;
  // private refreshTokenTimeout;
  public account: Observable<User>;

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
        `${environment.apiUrl}/admin/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.accountSubject.next(user);
          console.log(user);
          localStorage.setItem('jwt_token', user.jwtToken);
          // this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    this.http
      .get(`${environment.apiUrl}/admin/auth/revoke-token`, {
        withCredentials: true,
      })
      .subscribe();
    // this.stopRefreshTokenTimer();
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

  updateMyData(data) {
    if (data.dateOfBirth) {
      data.dateOfBirth = data.dateOfBirth.getDateOnly();
    }
    return this.http.patch(`${environment.apiUrl}/user`, data).pipe(
      map((user: User) => {
        user = { ...this.accountValue, ...user };
        this.accountSubject.next(user);
        return user;
      })
    );
  }

  refreshToken() {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/auth/refresh-token`, {
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        }),
        map((account) => {
          this.accountSubject.next(account);
          localStorage.setItem('jwt_token', account.jwtToken);
          // this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  validateResetToken(token: string) {
    return this.http.post(
      `${environment.apiUrl}/account/validate-reset-token`,
      { token }
    );
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    const body = {
      token,
      password,
      confirmPassword,
    };
    return this.http.post(`${environment.apiUrl}/account/reset-password`, body);
  }

  forgotPassword(email: string) {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/account/forgot-password`,
      {
        email,
      }
    );
  }

  verifyEmail(token: string) {
    // return this.http.post(`${environment.apiUrl}/account/verify-email`, {
    //   token,
    // });
    return this.http.get(
      `${environment.apiUrl}/account/verify-email/?token=${token}`
    );
  }

  // private startRefreshTokenTimer() {
  //   // Parse json object from base64 encoded jwt token
  //   const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));
  //
  //   // Set a timeout to refresh the token a minute before it expires (14 minutes)
  //   const expires = new Date(jwtToken.exp * 1000);
  //   const timeout = expires.getTime() - Date.now() - 60 * 1000;
  //   this.refreshTokenTimeout = setTimeout(
  //     () => this.refreshToken().subscribe(),
  //     timeout
  //   );
  // }

  // private stopRefreshTokenTimer() {
  //   clearTimeout(this.refreshTokenTimeout);
  // }
}
