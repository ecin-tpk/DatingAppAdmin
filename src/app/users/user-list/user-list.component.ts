import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserParams } from '../../_helpers';
import { Genders, User, Verification } from '../../_models';
import { UserService } from '../../_services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  pagination: any = {};
  userParams: UserParams;
  actions: any[];
  name: string;
  usersSub: Subscription;
  paginationSub: Subscription;
  filtersCount: number;
  submitted = false;
  genders = Genders;
  verification = Verification;
  pageSizes: any[] = [
    { itemsPerPage: 10, text: '10 per page' },
    { itemsPerPage: 5, text: '5 per page' },
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.filtersCount = 0;
      this.submitted = false;
      this.name = '';

      this.pagination.itemsPerPage = 10;
      this.pagination.currentPage = 1;

      this.actions = this.getActions(params.status);
      this.userParams = this.defaultUserParams(params.status);

      this.userService.getPagination(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      );

      this.usersSub = this.userService.usersSubject.subscribe((users) => {
        this.users = users;
      });
      this.paginationSub = this.userService.paginationSubject.subscribe(
        (pagination) => {
          this.pagination = pagination;
        }
      );
    });
  }

  defaultUserParams(status: string) {
    return new UserParams('', 18, 99, '', '', status, '', true);
  }

  onPageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  getUsers() {
    this.userService.getPagination(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.userParams
    );
  }

  sortUsers(orderBy: string) {
    this.userParams.orderBy = orderBy;
    this.getUsers();
  }

  updateStatus(id, action) {
    let status;

    switch (action) {
      case 'Enable':
        status = 'Active';
        break;
      case 'Disable':
        status = 'Disabled';
        break;
      case 'Delete':
        status = 'Deleted';
        break;
    }
    this.userService.update(id, { status }).subscribe(() => {
      this.getUsers();
    });
  }

  onFilterChanged() {
    let count = 0;

    for (const [key, value] of Object.entries(this.userParams)) {
      if (key === '_gender' || key === '_verification') {
        if (value !== '') {
          count++;
        }
      }
    }

    this.filtersCount = count;
  }

  onSubmit(dropdown) {
    this.submitted = true;
    dropdown.hide();

    this.pagination.currentPage = 1;

    this.userService.getPagination(
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.userParams
    );
  }

  clearFilters() {
    this.userParams.gender = '';
    this.userParams.verification = '';
    this.filtersCount = 0;
    this.getUsers();
  }

  onHidden() {
    if (!this.submitted) {
      this.clearFilters();
    }
  }

  search() {
    if (/^\s+$/.test(this.name) || this.name === this.userParams.name) {
      return;
    }
    this.userParams.name = this.name;
    this.getUsers();
  }

  getActions(status) {
    const stats = ['active', 'disabled', 'deleted'];
    const actions = [
      ['Disable', 'Delete'],
      ['Enable', 'Delete'],
      ['Enable', 'Disable'],
    ];

    const i = stats.findIndex((s) => s === status);

    return actions[i];
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.paginationSub.unsubscribe();
  }
}
