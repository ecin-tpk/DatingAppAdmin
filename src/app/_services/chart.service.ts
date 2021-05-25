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
      `${environment.apiUrl}/admin/users/charts/monthly-new/${milliseconds}`
    );
  }

  getTotalUsersPerMonth(
    milliseconds,
    period: 'monthly' | 'quarterly' | 'daily'
  ) {
    return this.http.get<TimeValueData>(
      `${environment.apiUrl}/admin/users/charts/total/${milliseconds}/${period}`
    );
  }

  getActivePercentage(milliseconds) {
    return this.http.get<TimeValueData>(
      `${environment.apiUrl}/admin/users/charts/active/${milliseconds}`
    );
  }
}
