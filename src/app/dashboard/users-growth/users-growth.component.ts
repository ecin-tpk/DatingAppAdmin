import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from '../../_services';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-users-growth',
  templateUrl: './users-growth.component.html',
  styleUrls: ['./users-growth.component.css'],
})
export class UsersGrowthComponent implements OnInit {
  totalUsersPerMonthChartLabels: Label[];
  totalUsersPerMonthChartData: ChartDataSets[];

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.totalUsersPerMonthChartData = [
      {
        data: [],
      },
    ];

    this.getChartData('monthly');
  }

  onSelect(data: TabDirective) {
    this.getChartData(data.heading);
  }

  private getChartData(period) {
    this.chartService
      .getTotalUsersPerMonth(Date.now(), period)
      .subscribe((res) => {
        this.totalUsersPerMonthChartLabels = res.dates;
        this.totalUsersPerMonthChartData = [
          {
            data: res.values,
            label: 'All',
            backgroundColor: 'transparent',
            borderColor: '#2c7be5',
            pointBackgroundColor: '#2c7be5',
            pointBorderColor: '#2c7be5',
            pointHoverBorderColor: '#006cfa',
            pointHoverBackgroundColor: '#006cfa',
          },
        ];
      });
  }
}
