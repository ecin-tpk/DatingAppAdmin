import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../_services/report.service';
import { ReportStatus } from '../../_models';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  tabs = {
    headings: ReportStatus,
    counts: [],
  };
  pageSizes = [
    { itemsPerPage: 9, text: '9 per page' },
    { itemsPerPage: 3, text: '3 per page' },
  ];
  pagination = {
    itemsPerPage: 3,
    totalItems: 30,
  };
  reports: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['view'] && ReportStatus.includes(params['view'])) {
        this.reportService.countByStatus().subscribe((res) => {
          this.tabs.counts = res;
        });
        const stats = params['view'];
        this.reportService.getPagination(1, 3, stats).subscribe((res) => {
          this.reports = res.body;
        });
      } else {
        this.router.navigate(['../list'], {
          relativeTo: this.route,
          queryParams: { view: 'pending' },
        });
      }
    });
  }

  getUsers() {}

  onPageChanged(event) {}
}
