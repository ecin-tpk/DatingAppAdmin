import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  success = false;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.token = params['token'];
        this.accountService.validateResetToken(this.token).subscribe(
          () => {},
          () => {
            this.router.navigate(['/not-found']);
          }
        );
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  onResetPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.accountService
      .resetPassword(
        this.token,
        form.value.password,
        form.value.confirmPassword
      )
      .subscribe(
        () => {
          this.isLoading = false;
          this.success = true;
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
