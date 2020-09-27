import { Component, OnDestroy } from '@angular/core';

import { User } from './_models';
import { AuthService } from './_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  userSub: Subscription;
  user: User;

  constructor(public authService: AuthService) {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
