import { Component, OnInit } from '@angular/core';

import { ReportService } from '../../_services';
import { ReportParams } from '../../_helpers';
import { Report } from '../../_models';

@Component({
  selector: 'app-new-reports',
  templateUrl: './new-reports.component.html',
  styleUrls: ['./new-reports.component.css'],
})
export class NewReportsComponent implements OnInit {
  reports: Report[];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    const reportParams: ReportParams = {
      pageNumber: 1,
      pageSize: 4,
      gender: '',
      status: 'pending',
    };
    this.reportService.getPagination(reportParams).subscribe((res) => {
      this.reports = res.body;
    });
  }
}
