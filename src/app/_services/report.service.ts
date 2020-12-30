import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getPagination(pageNumber: number, pageSize: number, status: string) {
    let params = new HttpParams();
    params = params
      .append('pageNumber', '1')
      .append('pageSize', pageSize.toString())
      .append('status', status);

    return this.http.get<
      {
        id: number;
        reportSent: Date;
        senderId: number;
        status: number;
        userId: number;
      }[]
    >(`${environment.apiUrl}/admin/reports/pagination`, {
      observe: 'response',
      params,
    });
  }

  updateStatus(id: number, status: string) {
    return this.http.put(`${environment.apiUrl}/admin/reports/${id}`, {
      status,
    });
  }

  countByStatus() {
    return this.http.get<number[]>(`${environment.apiUrl}/admin/reports/count`);
  }
}
