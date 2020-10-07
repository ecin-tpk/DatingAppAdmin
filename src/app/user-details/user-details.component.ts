import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services';
import { User } from '../_models';

import { first } from 'rxjs/operators';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  tabs: any[] = [
    { heading: 'overview', count: null },
    { heading: 'photos', count: null },
    { heading: 'matches', count: null },
    { heading: 'messages', count: null },
    { heading: 'linked accounts', count: null },
  ];
  user: User;

  id: number;

  @ViewChild('detailsTabs', { static: true })
  detailsTabs: TabsetComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe((user) => {
          this.user = user;
        });

      const tabHeading = this.router.url.split('/').pop();
      this.selectTab(tabHeading);
    });
  }

  onSelect(data: TabDirective) {
    this.router.navigate([data.heading], { relativeTo: this.route });
  }

  selectTab(tabHeading) {
    switch (tabHeading) {
      case 'overview':
        this.detailsTabs.tabs[0].active = true;
        break;
      case 'photos':
        this.detailsTabs.tabs[1].active = true;
        break;
      case 'likes':
        this.detailsTabs.tabs[2].active = true;
        break;
      case 'messages':
        this.detailsTabs.tabs[3].active = true;
        break;
      case 'linked accounts':
        this.detailsTabs.tabs[4].active = true;
        break;
    }
  }
}
