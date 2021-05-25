import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Photo } from '../_models';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import { User } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photosSubject = new Subject<Photo[]>();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getPhotos(id) {
    return;
  }

  setMain(userId, photoId) {
    return this.http
      .post(
        `${environment.apiUrl}/users/${userId}/photos/${photoId}/set-main`,
        { photoId }
      )
      .pipe(
        mergeMap(() => {
          return this.http
            .get(
              `${environment.apiUrl}/users/${this.accountService.accountValue.id}`
            )
            .pipe(
              map((account: User) => {
                account = { ...this.accountService.accountValue, ...account };
                this.accountService.accountSubject.next(account);
                return account;
              })
            );
        })
      );
  }

  delete(userId, photoId) {
    return this.http
      .delete(`${environment.apiUrl}/users/${userId}/photos/${photoId}`)
      .pipe(
        mergeMap(() => {
          return this.http
            .get(
              `${environment.apiUrl}/users/${this.accountService.accountValue.id}`
            )
            .pipe(
              map((account: User) => {
                account = { ...this.accountService.accountValue, ...account };
                this.accountService.accountSubject.next(account);
                return account;
              })
            );
        })
      );
  }

  countPhotos(milliseconds) {
    return this.http.get<number>(
      `${environment.apiUrl}/admin/photos/count/${milliseconds}`
    );
  }
}
