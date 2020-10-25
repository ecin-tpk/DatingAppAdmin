import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { AccountService, MessageService } from '../_services';
import { UserParams } from '../_helpers';
import { User } from '../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages1.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  account: User;
  accountSub: Subscription;

  messages: Message[] = [];

  constructor(
    private messageService: MessageService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.messageService
      .getPagination(1, 20, { userId: '21', recipientId: '1' })
      .subscribe((data) => {
        this.messages = data.body;
      });

    this.accountSub = this.accountService.account.subscribe((account) => {
      this.account = account;
    });
  }

  // defaultParams(status: string) {
  //   return new UserParams('', 18, 99, '', '', status, '', true);
  // }
  ngOnDestroy() {
    this.accountSub.unsubscribe();
  }
}
