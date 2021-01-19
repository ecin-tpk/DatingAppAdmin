import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './_models';
import { AccountService } from './_services';
import { SignalRService } from './_services/signal-r.service';
import { AlertService } from './_services/alert.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  alertSub: Subscription;
  alerts: any[] = [];
  showNavbar = false;

  constructor(
    public accountService: AccountService,
    private signalRService: SignalRService,
    private errorService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userSub = this.accountService.account.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        if (
          !(
            event['url'].includes('not-found') ||
            event['url'].includes('login') ||
            event['url'].includes('forgot-password') ||
            event['url'].includes('reset-password') ||
            event['url'].includes('verify-email')
          )
        ) {
          this.showNavbar = true;
        }
      });

    // if (localStorage.getItem('access_token')) {
    //   this.signalRService.connectToNotificationHub();
    // }
    this.signalRService.connectToNotificationHub();
    this.signalRService.addNotificationListener();

    this.alertSub = this.errorService.errorOccurred.subscribe(
      (errorMessage) => {
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
