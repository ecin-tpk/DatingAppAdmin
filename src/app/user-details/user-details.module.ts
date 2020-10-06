import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { LinkedAccountsComponent } from './linked-accounts/linked-accounts.component';
import { PhotosComponent } from './photos/photos.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { MessagesComponent } from './messages/messages.component';
import { LikesComponent } from './likes/likes.component';

@NgModule({
  declarations: [
    UserDetailsComponent,
    OverviewComponent,
    LinkedAccountsComponent,
    PhotosComponent,
    MessagesComponent,
    LikesComponent,
  ],
  imports: [CommonModule, RouterModule, UserDetailsRoutingModule, TabsModule],
})
export class UserDetailsModule {}
