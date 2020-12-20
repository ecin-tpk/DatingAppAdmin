import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
