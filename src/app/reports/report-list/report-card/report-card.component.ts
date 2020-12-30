import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../../../_services/report.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css'],
})
export class ReportCardComponent implements OnInit {
  @Input()
  report: any;

  constructor(private reportService: ReportService) {}

  ngOnInit() {}

  onUpdateStatus(status: 'Approved' | 'Disapproved') {
    this.reportService.updateStatus(this.report.id, status).subscribe((res) => {
      console.log(res);
    });
  }
}
