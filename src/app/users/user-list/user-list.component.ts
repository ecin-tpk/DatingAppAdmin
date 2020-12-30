import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genders, User, UserStatus, Verification } from '../../_models';
import { UserService } from '../../_services';
import { Pagination, UserParamsTest } from '../../_helpers';

@Component({
  selector: 'app-report-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  nameFilter: string;
  actions: string[];
  isLoading = false;
  filtersSubmitted = false;
  filtersCount = 0;
  genders = Genders;
  verification = Verification;
  tabs = {
    headings: UserStatus,
    counts: [],
  };
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };
  userParams: UserParamsTest = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: '',
    verification: '',
    name: '',
    gender: '',
    status: null,
  };
  users: User[] = [];

  pageSizes = [
    { itemsPerPage: 10, text: '10 per page' },
    { itemsPerPage: 5, text: '5 per page' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view && UserStatus.includes(params.view)) {
        this.userParams = this.defaultParams(params.view);
        this.actions = this.getActions(params.view);
        this.userService.countByStatus().subscribe((res) => {
          this.tabs.counts = res;
        });
        this.isLoading = true;
        this.users = [];
        this.getUsers();
      } else {
        this.router.navigate(['/users/list'], {
          queryParams: { view: 'active' },
        });
      }
    });
  }

  getUsers() {
    this.userService.getPaginationTest(this.userParams).subscribe(
      (res) => {
        this.users = res.body;
        this.pagination = JSON.parse(res.headers.get('Pagination'));
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.getUsers();
  }

  sortUsers(criteria) {
    this.userParams.orderBy = criteria;
    this.getUsers();
  }

  updateStatus(id: string, action: string) {}

  search() {
    if (
      /^\s+$/.test(this.nameFilter) ||
      this.nameFilter === this.userParams.name
    ) {
      return;
    }
    this.userParams.name = this.nameFilter;
    this.getUsers();
  }

  onHidden() {
    if (!this.filtersSubmitted) {
      console.log('not submitted');
    }
  }

  clearFilters() {
    this.userParams.gender = '';
    this.userParams.verification = '';
    this.filtersCount = 0;
    this.getUsers();
  }

  onFilterChanged() {
    let count = 0;
    for (const [key, value] of Object.entries(this.userParams)) {
      if (key === 'gender' || key === 'verification') {
        if (value !== '') {
          count++;
        }
      }
    }
    this.filtersCount = count;
  }

  onSubmit(dropdown: any) {
    this.filtersSubmitted = true;
    dropdown.hide();

    this.getUsers();

    // this.pagination.currentPage = 1;
    //
    // this.userService.getPagination(
    //   this.pagination.currentPage,
    //   this.pagination.itemsPerPage,
    //   this.userParams
    // );
  }

  trackByUserId(index: number, user: User) {
    return user.id;
  }

  private defaultParams(status) {
    this.filtersCount = 0;
    this.filtersSubmitted = false;
    const params: UserParamsTest = {
      pageNumber: 1,
      pageSize: 10,
      orderBy: '',
      verification: '',
      name: '',
      gender: '',
      status,
    };
    return params;
  }

  private getActions(status) {
    const actions = [
      ['Disable', 'Delete'],
      ['Enable', 'Delete'],
      ['Enable', 'Disable'],
    ];
    return actions[UserStatus.indexOf(status)];
  }
}
