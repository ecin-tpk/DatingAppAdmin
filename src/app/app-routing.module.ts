import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_helpers';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const settingsModule = () =>
  import('./settings/settings.module').then((x) => x.SettingsModule);

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);

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
  },
  {
    path: 'users',
    loadChildren: usersModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
