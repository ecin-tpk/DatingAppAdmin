import { Component, OnInit, ViewChild } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

import { UserService } from '../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  isLoading = false;
  statusCounts = [];

  @ViewChild('userStatusTabs', { static: true })
  userStatusTabs: TabsetComponent;

  constructor(private usersService: UserService, private router: Router) {}

  ngOnInit() {
    // Select corresponding tab
    let tabHeading = this.router.url.split('/').pop();
    this.selectTab(tabHeading);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        tabHeading = event.url.split('/').pop();
        this.selectTab(tabHeading);
      }
    });

    this.usersService.getStatusCounts();

    this.usersService.statusCountsSubject.subscribe((statusCounts) => {
      this.statusCounts = statusCounts;
    });
  }

  onSelectStatus(data: TabDirective) {
    this.router.navigate(['/users/' + data.heading]);
  }

  selectTab(tabHeading: string) {
    try {
      switch (tabHeading) {
        case 'active':
          this.userStatusTabs.tabs[0].active = true;
          break;
        case 'disabled':
          this.userStatusTabs.tabs[1].active = true;
          break;
        case 'deleted':
          this.userStatusTabs.tabs[2].active = true;
          break;
        default:
          this.userStatusTabs.tabs[0].active = true;
          break;
      }
    } catch (error) {}
  }
}
