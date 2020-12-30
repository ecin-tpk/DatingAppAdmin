import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';

import { MessageBubble} from '../_models/message.model';
import { AccountService, MessageService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  account: User;
  accountSub: Subscription;

  messages: MessageBubble[] = [];

  private hubConnection: signalR.HubConnection;

  constructor(
    private messageService: MessageService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.messageService
      .getPagination(1, 20, { userId: '21', recipientId: '1' })
      .subscribe((data) => {
        this.messages = data.body;
        console.log(this.messages);
      });

    this.accountSub = this.accountService.account.subscribe((account) => {
      this.account = account;
    });

    this.startConnection();
    this.addReceiveMessageListener();
  }

  private startConnection() {
    const opt: IHttpConnectionOptions = {
      accessTokenFactory(): string | Promise<string> {
        return localStorage.getItem('access_token');
      },
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.0.108:5000/hubs/messages', opt)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connecting to message hub');
      })
      .catch((err) => {
        console.log('Error while connecting to message hub: ' + err);
      });
  }

  private addReceiveMessageListener() {
    this.hubConnection.on('receiveMessage', (data) => {
      console.log(data);
    });
  }

  public send() {
    this.messageService.sendMessage(null, null).subscribe((data) => {
      console.log('Message sent');
    });
  }

  // defaultParams(status: string) {
  //   return new UserParams('', 18, 99, '', '', status, '', true);
  // }
  ngOnDestroy() {
    this.accountSub.unsubscribe();
  }
}
