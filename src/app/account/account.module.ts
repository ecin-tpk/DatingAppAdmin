import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    AlertModule.forRoot()
  ]
})
export class AccountModule { }
