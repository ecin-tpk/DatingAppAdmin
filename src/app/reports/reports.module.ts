import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TabsModule} from 'ngx-bootstrap/tabs';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportListComponent } from './report-list/report-list.component';
import {ReportCardComponent} from './report-list/report-card/report-card.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [ReportsComponent, ReportListComponent, ReportCardComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TabsModule,
    NgSelectModule,
    FormsModule,
    PaginationModule,
    BsDropdownModule,
  ],
})
export class ReportsModule {}
