import { Injectable } from '@angular/core';
import { Notification } from '../_models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new Subject<boolean>();
  notification$ = this.notificationSource.asObservable();

  getNewNotification() {
    const notifications: Notification[] = [
      {
        type: 'report',
        heading: 'Testing',
        text: 'Alo alo',
        time: '69s ago',
      },
      {
        type: 'message',
        heading: 'Testing',
        text: 'Alo alo',
        time: '69s ago',
      }
    ];
    return notifications;
  }

  saveNewNotification() {
    console.log('new notification');
  }
}
