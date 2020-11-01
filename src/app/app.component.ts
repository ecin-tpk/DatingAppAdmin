import { Component, OnDestroy } from '@angular/core';

import { User } from './_models';
import { AccountService } from './_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  user: User;
  userSub: Subscription;

  constructor(public authService: AccountService) {
    this.userSub = this.authService.account.subscribe((user) => {
      this.user = user;
    });

    console.log(this.user.jwtToken);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
