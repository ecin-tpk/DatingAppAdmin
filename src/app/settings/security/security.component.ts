import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { AuthService, UserService } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
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
        newPassword: ['', Validators.required],
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
          console.log('success');
          this.loading = false;
        },
        error: (err) => {
          console.log('error');
          this.loading = false;
        },
      });
  }

  resetForm() {
    this.f.currentPassword.setErrors(null);
    this.f.newPassword.setErrors(null);
    this.f.confirmPassword.setErrors(null);
  }
}
