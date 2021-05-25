import { Component, OnInit } from '@angular/core';
import { ChartService, PhotoService, UserService } from '../../_services';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-global-values',
  templateUrl: './global-values.component.html',
  styleUrls: ['./global-values.component.css'],
})
export class GlobalValuesComponent implements OnInit {
  totalUsers: number;
  totalUsersGrowthPercentage: number;
  totalPhotos: number;
  lastActivePercentage: number;
  activePercentageChartLabels: Label[];
  activePercentageChartData: ChartDataSets[];
  chartOptions: ChartOptions;

  constructor(
    private userService: UserService,
    private photoService: PhotoService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.getTotalUsers();
    this.getTotalPhotos();

    this.activePercentageChartData = [
      {
        data: [],
      },
    ];

    this.chartOptions = {
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{ display: false }],
      },
      elements: {
        line: {
          borderWidth: 2,
        },
        point: {
          hoverRadius: 0,
        },
      },
      tooltips: {
        custom: () => false,
      },
    };

    this.getActivePercentage();
  }

  private getTotalUsers() {
    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;
    this.userService.countUsers(thisYear).subscribe((data1) => {
      this.totalUsers = data1;
      this.userService.countUsers(lastYear).subscribe((data2) => {
        this.totalUsersGrowthPercentage = (this.totalUsers - data2) / 100;
      });
    });
  }

  private getTotalPhotos() {
    this.photoService.countPhotos(Date.now()).subscribe((data) => {
      this.totalPhotos = data;
    });
  }

  private getActivePercentage() {
    this.chartService.getActivePercentage(Date.now()).subscribe((res) => {
      this.lastActivePercentage =
        Math.round((res.values.slice(-1)[0] + Number.EPSILON) * 100) / 100;
      this.activePercentageChartLabels = res.dates;
      this.activePercentageChartData.push({
        data: res.values,
        backgroundColor: 'transparent',
        borderColor: '#2c7be5',
      });
    });
  }
}
