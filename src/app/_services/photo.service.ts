import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from '../_models/photo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
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
            .get(`${environment.apiUrl}/users/${this.accountService.accountValue.id}`)
            .pipe(
              map((account: User) => {
                console.log(account);
                account = { ...this.accountService.accountValue, ...account };
                this.accountService.accountSubject.next(account);
                return account;
              })
            );
        })
      );
  }
}
