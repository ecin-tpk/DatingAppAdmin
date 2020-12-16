import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartService, UserService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private thisYear: number;
  private lastYear: number;
  totalUsers: number;
  usersGrowth: number;
  newUsersChartLabels: Label[];
  newUsersChartData: ChartDataSets[];
  totalUsersPerMonthChartLabels: Label[];
  totalUsersPerMonthChartData: ChartDataSets[];
  usersByAgeChartLabels: Label[];
  usersByAgeChartColors: Color[];
  usersByAgeChartData: MultiDataSet;

  trafficChartLabels: Label[] = ['18-29', '30-49', '50+'];
  trafficChartColors: Color[] = [
    {
      backgroundColor: ['#ea4c89', '#f7a6e0', '#ecd2e5'],
      hoverBorderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
    },
  ];
  trafficChartData: MultiDataSet = [[60, 25, 15]];

  constructor(
    private chartService: ChartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.chartService.styleCharts();
    this.thisYear = new Date().getFullYear();
    this.lastYear = new Date().getFullYear() - 1;

    this.initNewUsersPerMonthChart();

    this.initTotalUsersPerMonthChart();

    this.initUsersByAgeChart();
  }

  initNewUsersPerMonthChart() {
    this.newUsersChartData = [
      {
        data: [],
        label: new Date().getFullYear().toString(),
        maxBarThickness: 10,
        backgroundColor: '#ea4c89',
        hoverBackgroundColor: '#fa00b4',
        hidden: true,
      },
      {
        data: [],
        maxBarThickness: 10,
        backgroundColor: '#D2DDEC',
        hoverBackgroundColor: '#A4C1EA',
        hidden: true,
      },
    ];

    this.userService.getNewUsersPerMonth(this.thisYear).subscribe((data) => {
      this.newUsersChartLabels = data.map((item, index) => {
        return this.chartService.months[index];
      });

      this.newUsersChartData.push({
        data,
        label: new Date().getFullYear().toString(),
        maxBarThickness: 10,
        backgroundColor: '#ea4c89',
        hoverBackgroundColor: '#fa00b4',
      });
    });
  }

  initTotalUsersPerMonthChart() {
    this.totalUsersPerMonthChartData = [
      {
        data: [],
        label: 'All',
        backgroundColor: 'transparent',
        borderColor: '#ea4c89',
        pointBackgroundColor: '#ea4c89',
        pointBorderColor: '#ea4c89',
        pointHoverBorderColor: '#fa00b4',
        pointHoverBackgroundColor: '#fa00b4',
      },
    ];

    this.userService.getTotalUsersPerMonth(this.thisYear).subscribe((data) => {
      this.totalUsersPerMonthChartLabels = data.map((item, index) => {
        return this.chartService.months[index];
      });

      this.totalUsersPerMonthChartData.push({
        data,
        label: 'All',
        backgroundColor: 'transparent',
        borderColor: '#ea4c89',
        pointBackgroundColor: '#ea4c89',
        pointBorderColor: '#ea4c89',
        pointHoverBorderColor: '#fa00b4',
        pointHoverBackgroundColor: '#fa00b4',
      });

      // Calculate user growth rate
      this.totalUsers = data[data.length - 1];

      this.userService
        .getTotalUsersPerMonth(this.lastYear)
        .subscribe((data2) => {
          this.usersGrowth = Math.round(
            ((this.totalUsers - data2[data2.length - 1]) /
              data2[data2.length - 1]) *
              100
          );
        });
    });
  }

  initUsersByAgeChart() {
    this.usersByAgeChartData = [];
    this.usersByAgeChartColors = [
      {
        backgroundColor: ['#ea4c89', '#f7a6e0', '#ecd2e5'],
        hoverBorderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      },
    ];
    this.usersByAgeChartLabels = ['18-29', '30-49', '50+'];
    this.userService
      .getPercentageUsersByAge(this.thisYear)
      .subscribe((data) => {
        this.usersByAgeChartData = [...this.usersByAgeChartData, data];
        console.log(this.usersByAgeChartData);
      });
  }

  compareLastYear(event) {
    if (event) {
      this.userService.getNewUsersPerMonth(this.lastYear).subscribe((data) => {
        this.newUsersChartData.push({
          data,
          label: this.lastYear.toString(),
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
