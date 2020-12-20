import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../_services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  private token: string;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accService: AccountService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.token = params['token'];
        this.accService.validateResetToken(this.token).subscribe(
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
    this.accService
      .resetPassword(
        this.token,
        form.value.password,
        form.value.confirmPassword
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
