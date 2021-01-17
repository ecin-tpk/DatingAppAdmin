import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { appInitializer, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { AccountService } from './_services';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { SwitchComponent } from './_components/switch/switch.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MessagesComponent } from './messages/messages.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertComponent } from './_components/alert/alert.component';
import { NewReportsComponent } from './dashboard/new-reports/new-reports.component';
import { UsersGrowthComponent } from './dashboard/users-growth/users-growth.component';
import { GlobalValuesComponent } from './dashboard/global-values/global-values.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    SwitchComponent,
    MessagesComponent,
    PageNotFoundComponent,
    NewReportsComponent,
    UsersGrowthComponent,
    GlobalValuesComponent,
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
    AlertModule,
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
  exports: [AlertComponent],
})
export class AppModule {}
