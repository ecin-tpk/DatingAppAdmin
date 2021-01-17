import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../_models';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { NotificationService } from '../../../_services';

@Component({
  selector: 'app-modal-activity',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css'],
})
export class ActivityModalComponent implements OnInit {
  activities: Notification[];
  selectedTab = 'Action';
  headings = ['action', 'user'];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.activities = this.notificationService.getNewNotification();
  }

  onSelect(data: TabDirective) {
    this.selectedTab = data.heading;
  }
}
