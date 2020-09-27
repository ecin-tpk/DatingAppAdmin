import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-activity',
  templateUrl: './modal-activity.component.html',
  styleUrls: ['./modal-activity.component.css'],
})
export class ModalActivityComponent implements OnInit {
  title: string;
  activities: { heading: string; text: string; time: string }[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
