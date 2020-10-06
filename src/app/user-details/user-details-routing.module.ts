import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent } from './user-details.component';
import { OverviewComponent } from './overview/overview.component';
import { PhotosComponent } from './photos/photos.component';

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
        path: 'likes',
        component: PhotosComponent,
      },
      {
        path: 'messages',
        component: PhotosComponent,
      },
      {
        path: 'linked-accounts',
        component: PhotosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
