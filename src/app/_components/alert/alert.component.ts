import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('* <=> *', animate('150ms linear')),
    ]),
  ],
})
export class AlertComponent implements OnInit {
  message: string;
  type: 'danger' | 'success';
  isOpen = false;
  @Input()
  dismissible: boolean;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.errorOccurred.subscribe((err) => {
      this.type = err.type;
      this.message = err.message;
      this.isOpen = true;
    });
  }

  onClose() {
    this.message = null;
    this.isOpen = false;
  }
}
