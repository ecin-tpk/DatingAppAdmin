import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgePipe } from './age.pipe';
import { ActivityModalComponent } from './modals/activity-modal/activity-modal.component';
import { SearchModalComponent } from './modals/search-modal/search-modal.component';
import {TabsModule} from "ngx-bootstrap/tabs";

@NgModule({
  declarations: [AgePipe, ActivityModalComponent, SearchModalComponent],
  imports: [CommonModule, TabsModule],
  exports: [AgePipe],
})
export class SharedModule {}
