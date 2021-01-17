import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReportService } from '../../../_services';
import { Report, ReportStatus } from '../../../_models';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css'],
})
export class ReportCardComponent implements OnInit {
  actions: string[];
  @Input()
  report: Report;
  @Output()
  updated = new EventEmitter<boolean>();

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getActions(this.report?.status);
  }

  updateStatus(status: string) {
    this.reportService.updateStatus(this.report.id, status).subscribe((res) => {
      this.updated.emit(true);
    });
  }

  private getActions(status) {
    const actions = [['Approved', 'Disapproved'], ['Delete'], ['Delete']];
    this.actions = actions[ReportStatus.indexOf(status.toLowerCase())];
  }
}
