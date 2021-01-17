import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  isLoading = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.accountService.forgotPassword(form.value.email).subscribe(
      (res) => {
        this.successMessage = 'E-mail sent';
        this.isLoading = false;
      },
      (err) => {
        this.errorMessage = err;
        this.isLoading = false;
      }
    );
  }
}
