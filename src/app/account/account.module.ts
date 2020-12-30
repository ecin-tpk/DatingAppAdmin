import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    AlertModule.forRoot(),
    FormsModule,
  ],
})
export class AccountModule {}
