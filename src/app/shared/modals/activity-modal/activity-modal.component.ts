import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from '../../../_services/signal-r.service';

@Component({
  selector: 'app-modal-activity',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css'],
})
export class ActivityModalComponent implements OnInit {
  title: string;
  activities: { heading: string; text: string; time: string }[] = [];

  constructor() {}

  ngOnInit() {}
}
