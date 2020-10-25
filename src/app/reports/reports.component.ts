import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  pageSizes = [
    { itemsPerPage: 9, text: '9 per page' },
    { itemsPerPage: 3, text: '3 per page' },
  ];

  pagination: any = {
    itemsPerPage: 3,
    totalItems: 30,

  };

  constructor() {}

  ngOnInit(): void {}

  getUsers(){}

  onSelectStatus(event) {}

  onPageChanged(event){}
}
