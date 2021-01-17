import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from '../../_services';
import { Pagination, ReportParams } from '../../_helpers';
import { Genders, ReportStatus } from '../../_models';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit, OnDestroy {
  private reportsSub: Subscription;
  reports: any[];
  isLoading = false;
  filtersSubmitted = false;
  filtersCount = 0;
  genders = Genders;
  tabs = {
    headings: ReportStatus,
    counts: [],
  };
  pageSizes = [
    { itemsPerPage: 9, label: '9 per page' },
    { itemsPerPage: 3, label: '3 per page' },
  ];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };
  reportParams: ReportParams = {
    pageNumber: 1,
    pageSize: 9,
    gender: '',
    status: null,
  };
  approvedTimes = [
    { approved: 0, text: '0' },
    { approved: 4, text: '< 5' },
    { approved: 5, text: '> 5' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view && ReportStatus.includes(params.view)) {
        this.reportParams = this.defaultParams(params.view);
        this.getReportStatusCounts();
        this.isLoading = true;
        this.reports = [];
        this.getReports();
      } else {
        this.router.navigate(['../list'], {
          relativeTo: this.route,
          queryParams: { view: 'pending' },
        });
      }
    });
    this.reportsSub = this.reportService.reports$.subscribe((reports) => {
      this.reports = reports;
    });
  }

  getReports() {
    this.reportService.getPagination(this.reportParams).subscribe(
      (res) => {
        // this.reports = res.body;
        this.pagination = JSON.parse(res.headers.get('Pagination'));
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onPageChanged(event) {
    this.reportParams.pageNumber = event.page;
    this.getReports();
  }

  onUpdated(updated: boolean) {
    if (updated) {
      this.getReports();
      this.getReportStatusCounts();
    }
  }

  onHidden() {}

  clearFilters() {}

  onFilterChanged() {
    let count = 0;
    for (const [key, value] of Object.entries(this.reportParams)) {
      if (key === 'gender' || key === 'approved') {
        if (value !== '') {
          count++;
        }
      }
    }
    this.filtersCount = count;
  }

  onSubmit(dropdown) {
    this.filtersSubmitted = true;
    dropdown.hide();

    this.getReports();
  }

  private getReportStatusCounts() {
    this.reportService.countByStatus().subscribe((res) => {
      this.tabs.counts = res;
    });
  }

  private defaultParams(status) {
    this.filtersCount = 0;
    this.filtersSubmitted = false;
    const params: ReportParams = {
      pageNumber: 1,
      pageSize: 9,
      gender: '',
      status,
    };
    return params;
  }

  ngOnDestroy() {
    this.reportsSub.unsubscribe();
  }
}
