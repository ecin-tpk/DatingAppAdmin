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
  newUsersChartLabels: Label[] = [];
  newUsersChartData: ChartDataSets[];
  usersByAgeChartLabels: Label[];
  usersByAgeChartColors: Color[];
  usersByAgeChartData: MultiDataSet;
  private thisYear: string;
  private lastYear: string;
  private labels: string[];

  constructor(
    private chartService: ChartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.thisYear = new Date().getFullYear().toString();
    this.lastYear = (new Date().getFullYear() - 1).toString();

    this.initNewUsersPerMonthChart();

    this.initUsersByAgeChart();
  }

  initNewUsersPerMonthChart() {
    this.newUsersChartData = [
      {
        data: [],
        hidden: true,
      },
      {
        data: [],
        hidden: true,
      },
    ];
    this.chartService.getNewUsersPerMonth(Date.now()).subscribe((res) => {
      this.newUsersChartLabels = this.labels = res.dates;
      this.newUsersChartData.push({
        data: res.values,
        label: this.thisYear,
        maxBarThickness: 10,
        backgroundColor: '#2c7be5',
        hoverBackgroundColor: '#006cfa',
      });
    });
  }

  initUsersByAgeChart() {
    this.usersByAgeChartData = [];
    this.usersByAgeChartColors = [
      {
        backgroundColor: ['#2c7be5', '#a6c5f7', '#d2ddec'],
        hoverBorderColor: ['#ffffff', '#ffffff', '#ffffff'],
      },
    ];
    this.usersByAgeChartLabels = ['18-29', '30-49', '50+'];
    this.userService
      .getPercentageUsersByAge(this.thisYear)
      .subscribe((data) => {
        this.usersByAgeChartData = [...this.usersByAgeChartData, data];
      });
  }

  compareLastYear(event) {
    if (event) {
      const now = new Date();
      now.setMonth(now.getMonth() - 12);
      const milliseconds = now.getTime();
      this.chartService.getNewUsersPerMonth(milliseconds).subscribe((res) => {
        this.newUsersChartData.push({
          data: res.values,
          label: this.lastYear,
          maxBarThickness: 10,
          backgroundColor: '#D2DDEC',
          hoverBackgroundColor: '#A4C1EA',
        });

        this.newUsersChartLabels = res.dates.map(
          (date) => date.toString().split(' ')[0]
        );
      });
    } else {
      this.newUsersChartData.pop();
      this.newUsersChartLabels = this.labels;
    }
  }
}
