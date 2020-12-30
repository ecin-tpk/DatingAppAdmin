import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { map } from 'rxjs/operators';
import { AccountService } from './account.service';
import { Pagination, UserParams, UserParamsTest } from '../_helpers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject: BehaviorSubject<User>;

  usersSubject = new Subject<User[]>();
  paginationSubject = new Subject<Pagination>();
  statusCountsSubject = new Subject<number[]>();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((user) => {
      this.userSubject = new BehaviorSubject<User>(user);
    });
  }

  getStatusCounts() {
    return this.http
      .get<number[]>(`${environment.apiUrl}/admin/users/status-count`)
      .subscribe((statusCounts) => {
        this.statusCountsSubject.next(statusCounts);
      });
  }

  countByStatus() {
    return this.http.get<number[]>(
      `${environment.apiUrl}/admin/users/status-count`
    );
  }

  getPagination(pageNumber?, pageSize?, userParams?) {
    const params = this.requestParams(pageNumber, pageSize, userParams);

    return this.http
      .get<User[]>(`${environment.apiUrl}/admin/users`, {
        observe: 'response',
        params,
      })
      .subscribe((response) => {
        this.usersSubject.next(response.body);
        this.paginationSubject.next(
          JSON.parse(response.headers.get('Pagination'))
        );
      });
  }

  getPaginationTest(userParams: UserParamsTest) {
    let params = new HttpParams();
    params = params
      .append('pageNumber', userParams.pageNumber.toString())
      .append('pageSize', userParams.pageSize.toString())
      .append('gender', userParams.gender)
      .append('name', userParams.name)
      .append('orderBy', userParams.orderBy)
      .append('verification', userParams.verification)
      .append('status', userParams.status);

    return this.http.get<User[]>(`${environment.apiUrl}/admin/users`, {
      observe: 'response',
      params,
    });
  }

  getById(id) {
    return this.http.get<User>(`${environment.apiUrl}/admin/users/${id}`);
  }

  update(id, params) {
    if (params.dateOfBirth) {
      params.dateOfBirth = this.getDateOnly(params.dateOfBirth);
    }

    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
      map((user: User) => {
        // Next new counts
        this.getStatusCounts();

        // Update the current account if it was updated
        if (user.id === this.userSubject.value.id) {
          // Publish updated account to subscribers
          user = { ...this.userSubject.value, ...user };
          this.userSubject.next(user);
        }
        return user;
      })
    );
  }

  getNewUsersPerMonth(year) {
    return this.http.get<number[]>(
      `${environment.apiUrl}/admin/users/new-users-per-month/${year}`
    );
  }

  getTotalUsersPerMonth(year) {
    return this.http.get<number[]>(
      `${environment.apiUrl}/admin/users/users-per-month/${year}`
    );
  }

  getPercentageUsersByAge(year) {
    return this.http.get<number[]>(
      `${environment.apiUrl}/admin/users/users-by-age/${year}`
    );
  }

  // Helper methods
  requestParams(pageNumber?, pageSize?, userParams?) {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    if (userParams != null) {
      params = params.append('name', userParams.name);
      params = params.append('gender', userParams.gender);
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('verification', userParams.verification);
      params = params.append('status', userParams.status);
      params = params.append('orderBy', userParams.orderBy);
    }

    return params;
  }

  getDateOnly(date) {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
}
