import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartColor, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label, MultiDataSet } from 'ng2-charts';
import { Chart } from 'chart.js';
import { ChartService, UserService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number;
  usersGrowth: number;

  newUsersChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  newUsersChartData: ChartDataSets[] = [
    {
      data: [],
      label: new Date().getFullYear().toString(),
      maxBarThickness: 10,
      backgroundColor: '#2C7BE5',
      hoverBackgroundColor: '#006CFA',
      hidden: true,
    },
    {
      data: [],
      label: '2019',
      maxBarThickness: 10,
      backgroundColor: '#D2DDEC',
      hoverBackgroundColor: '#A4C1EA',
      hidden: true,
    },
  ];

  trafficChartLabels: Label[] = ['Direct', 'Organic', 'Referral'];
  trafficChartColors: Color[] = [
    {
      backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC'],
      hoverBorderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
    },
  ];
  trafficChartData: MultiDataSet = [[60, 25, 15]];

  lineChartLabels = [
    'Oct 1',
    'Oct 3',
    'Oct 6',
    'Oct 9',
    'Oct 12',
    'Oct 5',
    'Oct 18',
    'Oct 21',
    'Oct 24',
    'Oct 27',
    'Oct 30',
  ];
  lineChartData: ChartDataSets[] = [
    {
      data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25],
      label: 'All',
      backgroundColor: 'transparent',
      borderColor: '#2C7BE5',
      pointBackgroundColor: '#2C7BE5',
      pointBorderColor: '#2C7BE5',
      pointHoverBorderColor: '#006CFA',
      pointHoverBackgroundColor: '#006CFA',
    },
  ];

  constructor(
    private chartService: ChartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.chartService.styleCharts();
    const thisYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    this.userService.getNewUsersPerMonth(thisYear).subscribe((data) => {
      this.newUsersChartData.push({
        data,
        label: new Date().getFullYear().toString(),
        maxBarThickness: 10,
        backgroundColor: '#2C7BE5',
        hoverBackgroundColor: '#006CFA',
      });
      this.numberOfUsers = data.reduce((a, b) => a + b, 0);

      let numberOfUsersLastYear;
      this.userService
        .getNewUsersPerMonth(lastYear)
        .subscribe((lastYearData) => {
          numberOfUsersLastYear = lastYearData.reduce((a, b) => a + b, 0);
          this.usersGrowth = Math.round(
            ((this.numberOfUsers - numberOfUsersLastYear) /
              this.numberOfUsers) *
              100
          );
        });
    });
  }

  compareLastYear(event) {
    if (event) {
      const lastYear = new Date().getFullYear() - 1;
      this.userService.getNewUsersPerMonth(lastYear).subscribe((data) => {
        this.newUsersChartData.push({
          data,
          label: lastYear.toString(),
          maxBarThickness: 10,
          backgroundColor: '#D2DDEC',
          hoverBackgroundColor: '#A4C1EA',
        });
      });
    } else {
      this.newUsersChartData.pop();
    }
  }
}
