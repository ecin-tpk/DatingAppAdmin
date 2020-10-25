import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { appInitializer, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AccountService } from './_services';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { SwitchComponent } from './_components/switch/switch.component';
import { ReportsComponent } from './reports/reports.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MessagesComponent } from './messages/messages.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { ReportCardComponent } from './reports/report-card/report-card.component';
import {PaginationModule} from "ngx-bootstrap/pagination";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    SwitchComponent,
    ReportsComponent,
    MessagesComponent,
    ReportCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    NgSelectModule,
    FormsModule,
    PaginationModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AccountService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
