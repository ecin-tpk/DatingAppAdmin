import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AgePipe } from './age.pipe';
import { ActivityModalComponent } from './modals/activity-modal/activity-modal.component';
import { SearchModalComponent } from './modals/search-modal/search-modal.component';
import { MustMatchDirective } from '../_helpers/must-match.directive';
import { AlertComponent } from '../_components/alert/alert.component';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AgePipe,
    ActivityModalComponent,
    SearchModalComponent,
    MustMatchDirective,
    AlertComponent,
  ],
  imports: [CommonModule, TabsModule, AlertModule],
  exports: [AgePipe, MustMatchDirective, AlertComponent],
})
export class SharedModule {}
