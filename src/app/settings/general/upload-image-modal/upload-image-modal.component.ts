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
import { AccountService, UserService } from '../../../_services';
import { User } from '../../../_models';
import { Photo } from '../../../_models/photo';
import { PhotoService } from '../../../_services/photo.service';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.css'],
})
export class UploadImageModalComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  account = this.accountService.accountValue;

  selectedPhotoId: number;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private accountService: AccountService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.selectedPhotoId = this.account.photos.find((p) => p.isMain).id;
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: `${environment.apiUrl}/users/${this.account.id}/photos`,
      authToken: 'Bearer ' + this.account.jwtToken,
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

  setMainPhoto() {
    this.photoService.setMain(this.account.id, this.selectedPhotoId).subscribe(() => {
      console.log('success');
    });
  }
}
