import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  @Input()
  user: any;

  constructor() {}

  ngOnInit(): void {}
}
