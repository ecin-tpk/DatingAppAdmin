import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, UserService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { User } from '../../_models';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  tabId = new Subject<number>();

  // TODO: Fix user form not updating
  user = this.authService.userValue;

  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;
  bsModalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      dateOfBirth: [new Date(this.user.dateOfBirth), Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.userService
      .update(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('success');
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  openUploadModal() {
    this.bsModalRef = this.modalService.show(UploadImageModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
