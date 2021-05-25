import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, UserService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { User } from '../../_models';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  account: User;
  accountSub: Subscription;

  alerts: any[] = [];
  tabId = new Subject<number>();

  // user = this.accountService.accountValue;

  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;
  bsModalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private modalService: BsModalService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.accountSub = this.accountService.account.subscribe((account) => {
      this.account = account;
    });

    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.account.name, Validators.required],
      gender: [this.account.gender, Validators.required],
      email: [this.account.email, [Validators.required, Validators.email]],
      phone: [this.account.phoneNumber],
      dateOfBirth: [new Date(this.account.dateOfBirth), Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountService
      .updateMyData(this.form.value)
      // .pipe(first())
      .pipe()
      .subscribe(
        () => {
          this.alerts = [];
          this.alerts.push({
            type: 'success',
            msg: 'Update successful',
            dismissible: true,
            timeout: 5000,
          });
          this.loading = false;

          this.alertService.showAlert('success', 'Updated successfully');
        },
        (err) => {
          this.alerts.push({
            type: 'danger',
            msg: err,
            dismissible: true,
          });
          this.loading = false;
          this.alertService.showAlert('danger', 'Failed to update');
        }
      );
  }

  openAvatarModal() {
    this.bsModalRef = this.modalService.show(UploadImageModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
