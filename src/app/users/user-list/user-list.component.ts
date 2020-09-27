import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserParams } from '../../_helpers/user-params';
import { Subscription } from 'rxjs';
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
  userStatus: string;
  knownAs: string;
  usersSub: Subscription;
  paginationSub: Subscription;
  filtersCount: number;
  isFiltered: boolean;
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
      // this.filtersCount = 0;
      // this.isFiltered = false;
      // this.knownAs = '';

      this.pagination.itemsPerPage = 10;
      this.pagination.currentPage = 1;

      this.userStatus = params.status;
      this.userParams = this.defaultUserParams(params.status);

      this.userService.getPagination(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      );

      this.usersSub = this.userService.usersChanged.subscribe((users) => {
        this.users = users;

        console.log(this.users);
      });
      this.paginationSub = this.userService.paginationChanged.subscribe(
        (pagination) => {
          this.pagination = pagination;
        }
      );
    });
  }

  defaultUserParams(status: string) {
    return new UserParams('', 18, 99, '', '', status, 'lastActive', true);
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

  filtersChanged() {
    if (
      this.userParams.gender !== 'any' &&
      this.userParams.verification !== ''
    ) {
      this.filtersCount = 2;
    } else if (
      this.userParams.gender !== 'any' ||
      this.userParams.verification !== ''
    ) {
      this.filtersCount = 1;
    } else {
      this.filtersCount = 0;
    }
  }

  onSubmitFilterForm(filtersForm) {
    if (
      this.userParams.gender !== 'any' ||
      this.userParams.verification !== ''
    ) {
      this.isFiltered = true;
      filtersForm.hide();
    }

    this.userService.getPagination(
      1,
      this.pagination.itemsPerPage,
      this.userParams
    );

    console.log(this.isFiltered);
  }

  clearFilters() {
    this.userParams.gender = 'any';
    this.userParams.verification = '';
    this.filtersCount = 0;
    if (this.isFiltered) {
      this.getUsers();
    }
  }

  closeFilters() {
    if (!this.isFiltered) {
      this.clearFilters();
    }
  }

  search() {
    if (
      /^\s+$/.test(this.knownAs) ||
      this.knownAs === this.userParams.knownAs
    ) {
      return;
    }
    this.userParams.knownAs = this.knownAs;
    this.getUsers();
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.paginationSub.unsubscribe();
  }
}
