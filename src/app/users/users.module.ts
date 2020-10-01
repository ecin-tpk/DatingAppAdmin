import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UserListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
})
export class UsersModule {}
