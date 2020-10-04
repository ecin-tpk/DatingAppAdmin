import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from '../_models/photo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photosSubject = new Subject<Photo[]>();

  constructor(private http: HttpClient) {}

  getPhotos(id) {
    return;
  }

  setMain(userId, photoId) {
    return this.http.post(
      `${environment.apiUrl}/users/${userId}/photos/${photoId}/set-main`,
      {}
    );
  }
}
