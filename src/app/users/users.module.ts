import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOverviewComponent } from './user-details/user-overview/user-overview.component';
import { UserMatchesComponent } from './user-details/user-matches/user-matches.component';
import { UserMessagesComponent } from './user-details/user-messages/user-messages.component';

@NgModule({
  declarations: [UsersComponent, UserListComponent, UserDetailsComponent, UserOverviewComponent, UserMatchesComponent, UserMessagesComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TabsModule,
    NgSelectModule,
    BsDropdownModule,
    SharedModule,
    PaginationModule,
    FormsModule,
  ],
})
export class UsersModule {}
