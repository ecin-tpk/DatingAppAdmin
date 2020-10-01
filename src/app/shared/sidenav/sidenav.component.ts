import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ModalActivityComponent } from '../components/nav/modal-activity/modal-activity.component';
import { ModalSearchComponent } from '../components/nav/modal-search/modal-search.component';
import { AuthService } from '../../_services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Input()
  avatarUrl: string;
  bsModalRef: BsModalRef;
  collapses = {
    nav: true,
    users: true,
  };

  constructor(
    private authService: AuthService,
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
        this.bsModalRef = this.modalService.show(ModalActivityComponent, {
          initialState,
          class: 'modal-dialog-vertical',
        });
        break;
      case 'search':
        this.bsModalRef = this.modalService.show(ModalSearchComponent, {
          class: 'modal-dialog-vertical',
        });
        break;
    }
  }
}
