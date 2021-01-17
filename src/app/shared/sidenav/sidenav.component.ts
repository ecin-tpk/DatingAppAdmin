import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ActivityModalComponent } from '../modals/activity-modal/activity-modal.component';
import { SearchModalComponent } from '../modals/search-modal/search-modal.component';
import { AccountService, UserService } from '../../_services';
import { User } from '../../_models';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  bsModalRef: BsModalRef;
  pendingCount = '';
  collapses = {
    nav: true,
    users: true,
    reports: true,
  };
  @Input()
  user: User;

  constructor(
    private authService: AccountService,
    private userService: UserService,
    private reportService: ReportService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.reportService.countByStatus().subscribe((res) => {
      this.pendingCount = res[0] !== 0 ? res[0].toString() : '';
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleCollapse(toggler) {
    const collapse = toggler.getAttribute('aria-controls');
    this.collapses[collapse] = !this.collapses[collapse];
  }

  openModal(opener: any) {
    const modal = opener.getAttribute('data-toggle');
    switch (modal) {
      case 'activity':
        this.bsModalRef = this.modalService.show(ActivityModalComponent, {
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
