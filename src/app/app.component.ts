import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './_models';
import { AccountService } from './_services';
import { SignalRService } from './_services/signal-r.service';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  alerts: any[] = [];
  alertSub: Subscription;

  constructor(
    public accountService: AccountService,
    private signalRService: SignalRService,
    private errorService: AlertService
  ) {
    this.userSub = this.accountService.account.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.signalRService.connectToNotificationHub();
    this.signalRService.addNotificationListener();

    this.alertSub = this.errorService.errorOccurred.subscribe(
      (errorMessage) => {
        if (errorMessage === 'Email is not registered') {
          return;
        }
        this.alerts = [];
        this.alerts.push({
          type: 'danger',
          msg: errorMessage,
          timeout: 3000,
        });
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.alertSub.unsubscribe();
  }
}
