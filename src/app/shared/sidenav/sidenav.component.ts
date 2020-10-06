import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ActivityModalComponent } from '../modals/activity-modal/activity-modal.component';
import { SearchModalComponent } from '../modals/search-modal/search-modal.component';
import { AccountService, UserService } from '../../_services';
import { User } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  bsModalRef: BsModalRef;
  collapses = {
    nav: true,
    users: true,
  };
  @Input()
  user: User;

  constructor(
    private authService: AccountService,
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  toggleCollapse(toggler) {
    const collapse = toggler.getAttribute('aria-controls');
    this.collapses[collapse] = !this.collapses[collapse];
  }

  openModal(opener: any) {
    const initialState = {
      activities: [
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'New feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
        {
          heading: 'last feature',
          text: 'Added private message system!',
          time: '2m ago',
        },
      ],
      title: 'Notifications',
    };
    const modal = opener.getAttribute('data-toggle');
    switch (modal) {
      case 'activity':
        this.bsModalRef = this.modalService.show(ActivityModalComponent, {
          initialState,
          class: 'modal-dialog-vertical',
        });
        break;
      case 'search':
        this.bsModalRef = this.modalService.show(SearchModalComponent, {
          class: 'modal-dialog-vertical',
        });
        break;
    }
  }
}
