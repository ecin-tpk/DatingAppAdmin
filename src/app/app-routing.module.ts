import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_helpers';
import { ReportsComponent } from './reports/reports.component';
import { MessagesComponent } from './messages/messages.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const settingsModule = () =>
  import('./settings/settings.module').then((x) => x.SettingsModule);

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);

const userDetailsModule = () =>
  import('./user-details/user-details.module').then((x) => x.UserDetailsModule);

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: accountModule,
  },
  {
    path: 'account/settings',
    loadChildren: settingsModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: usersModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details/:id',
    loadChildren: userDetailsModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'staff',
    loadChildren: usersModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
