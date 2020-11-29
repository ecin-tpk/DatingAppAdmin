import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private accessTokenOption: IHttpConnectionOptions = {
    accessTokenFactory(): string | Promise<string> {
      return localStorage.getItem('access_token');
    },
  };

  constructor() {}

  public connectToNotificationHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.0.108:5000/hubs/notification', this.accessTokenOption)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected to notification hub');
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addNotificationListener() {
    this.hubConnection.on('ReceiveNotification', (data) => {
      console.log(data);
    });
  }
}
