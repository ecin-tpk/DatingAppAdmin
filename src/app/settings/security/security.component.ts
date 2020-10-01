import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers';
import { AuthService, UserService } from '../../_services';
import { first } from 'rxjs/operators';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
  alerts: any[] = [];

  user = this.accountService.userValue;
  form: FormGroup;
  loading = false;
  submitted = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: MustMatch('newPassword', 'confirmPassword') }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService
      .updatePassword(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alerts = [];
          this.alerts.push({
            type: 'success',
            msg: 'Update password success',
            dismissible: true,
            timeout: 5000,
          });
          this.loading = false;
        },
        error: (err) => {
          this.alerts.push({
            type: 'danger',
            msg: err,
            dismissible: true,
          });
          this.loading = false;
        },
      });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
