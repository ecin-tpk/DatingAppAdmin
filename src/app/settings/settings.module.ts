import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { FileUploadModule } from 'ng2-file-upload';
import { AlertModule } from 'ngx-bootstrap/alert';

import { SettingsComponent } from './settings.component';
import { GeneralComponent } from './general/general.component';
import { MembersComponent } from './members/members.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SecurityComponent } from './security/security.component';
import { UploadImageModalComponent } from './general/upload-image-modal/upload-image-modal.component';
import { PreviewDirective } from '../_helpers/preview.directive';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    MembersComponent,
    SecurityComponent,
    UploadImageModalComponent,
    PreviewDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SettingsRoutingModule,
    FileUploadModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    SharedModule,
  ],
})
export class SettingsModule {}
