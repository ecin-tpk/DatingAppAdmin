import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Report } from '../_models';
import { ReportParams } from '../_helpers';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportsSource = new Subject<Report[]>();
  reports$ = this.reportsSource.asObservable();

  constructor(private http: HttpClient) {}

  getPagination(reportParams: ReportParams) {
    let params = new HttpParams();
    params = params
      .append('pageNumber', reportParams.pageNumber.toString())
      .append('pageSize', reportParams.pageSize.toString())
      .append('status', reportParams.status)
      .append('gender', reportParams.gender);

    return this.http
      .get<Report[]>(`${environment.apiUrl}/admin/reports`, {
        observe: 'response',
        params,
      })
      .pipe(
        tap((response) => {
          this.reportsSource.next(response.body);
        })
      );
  }

  updateStatus(id: number, status: string) {
    const body = { status };
    return this.http.put(`${environment.apiUrl}/admin/reports/${id}`, body);
  }

  countByStatus() {
    return this.http.get<number[]>(
      `${environment.apiUrl}/admin/reports/status-count`
    );
  }
}
