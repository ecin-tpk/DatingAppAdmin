import {Component, OnDestroy, OnInit} from '@angular/core';

import { User } from './_models';
import { AccountService } from './_services';
import { Subscription } from 'rxjs';
import {SignalRService} from './_services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  constructor(public accountService: AccountService, private signalRService: SignalRService) {
    this.userSub = this.accountService.account.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.signalRService.connectToNotificationHub();
    this.signalRService.addNotificationListener();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
