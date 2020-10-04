import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService, UserService } from '../../../_services';
import { User } from '../../../_models';
import { Photo } from '../../../_models/photo';
import { PhotoService } from '../../../_services/photo.service';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.css'],
})
export class UploadImageModalComponent implements OnInit, OnDestroy {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  user: User;
  userSub: Subscription;

  userId = this.authService.userValue.id;

  selectedPhotoId: number;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private authService: AuthService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe();

    this.userService.userSubject.subscribe((user) => {
      this.user = user;
    });

    this.initUploader();
  }

  test() {
    this.selectedPhotoId = this.user.photos.find((p) => p.isMain).id;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: `${environment.apiUrl}/users/${this.user.id}/photos`,
      authToken: 'Bearer ' + this.user.jwtToken,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
  }

  onDropZoneClick() {
    this.fileInput.nativeElement.click();
  }

  onPictureClick(photoId) {
    this.selectedPhotoId = photoId;
  }

  fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photoId) {
    this.photoService.setMain(this.userId, photoId).subscribe(() => {
      console.log('success');
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
