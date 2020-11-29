import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../_models/message';
import { MessageThreadParams } from '../_helpers';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getPagination(pageNumber?, pageSize?, msgThreadParams?: MessageThreadParams) {
    const params = this.requestParams(pageNumber, pageSize);

    return this.http.get<Message[]>(
      `${environment.apiUrl}/users/${msgThreadParams.userId}/messages/thread/${msgThreadParams.recipientId}`,
      {
        observe: 'response',
        params,
      }
    );
    // .subscribe((response) => {
    //   this.usersSubject.next(response.body);
    //   this.paginationSubject.next(
    //     JSON.parse(response.headers.get('Pagination'))
    //   );
    // });
  }

  sendMessage(id, message) {
    // return this.http.post(`${environment.apiUrl}/users/${id}/messages`, message);
    return this.http.get(`${environment.apiUrl}/values`);
  }

  // Helpers
  requestParams(pageNumber?, pageSize?) {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
  }
}
