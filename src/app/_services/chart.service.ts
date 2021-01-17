import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type TimeValueData = {
  dates: string[];
  values: number[];
};

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(private http: HttpClient) {}

  getNewUsersPerMonth(milliseconds) {
    return this.http.get<TimeValueData>(
      `${environment.apiUrl}/admin/charts/users/new-users-per-month/${milliseconds}`
    );
  }

  getTotalUsersPerMonth(
    milliseconds,
    period: 'monthly' | 'quarterly' | 'daily'
  ) {
    return this.http.get<TimeValueData>(
      `${environment.apiUrl}/admin/charts/users/total-users/${milliseconds}/${period}`
    );
  }

  getActivePercentage(milliseconds) {
    return this.http.get<TimeValueData>(
      `${environment.apiUrl}/admin/charts/users/active-percentage/${milliseconds}`
    );
  }
}
