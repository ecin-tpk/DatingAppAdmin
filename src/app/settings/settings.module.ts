import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';

import { SettingsComponent } from './settings.component';
import { GeneralComponent } from './general/general.component';
import { MembersComponent } from './members/members.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SecurityComponent } from './security/security.component';
import { UploadImageModalComponent } from './general/upload-image-modal/upload-image-modal.component';

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    MembersComponent,
    SecurityComponent,
    UploadImageModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SettingsRoutingModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
})
export class SettingsModule {}
