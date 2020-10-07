import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent } from './user-details.component';
import { OverviewComponent } from './overview/overview.component';
import { PhotosComponent } from './photos/photos.component';
import {LikesComponent} from './likes/likes.component';
import {MessagesComponent} from './messages/messages.component';
import {LinkedAccountsComponent} from './linked-accounts/linked-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'photos',
        component: PhotosComponent,
      },
      {
        path: 'matches',
        component: LikesComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'linked-accounts',
        component: LinkedAccountsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
