import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { DashboardDto } from 'src/app/_models/dashboard/dashboardDto';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.scss']
})
export class DashboardTemplateComponent implements OnInit {

  dashboardChartInfo: DashboardDto[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboards().subscribe(
      resData => {
        this.dashboardChartInfo = resData;
      },
      error => {
        console.log(error);
      }
    );
  }

  moveLeft(index: number) {
    if (index <= 0) return;
    this.swap(index, index - 1);
  }

  moveRight(index: number) {
    if (index >= this.dashboardChartInfo.length - 1) return;
    this.swap(index, index + 1);
  }

  private swap(from: number, to: number) {
    const temp = this.dashboardChartInfo[from];
    this.dashboardChartInfo[from] = this.dashboardChartInfo[to];
    this.dashboardChartInfo[to] = temp;

    const reorderList = this.dashboardChartInfo.map((chart, i) => ({
      dashboardChartId: chart.dashboardChartId,
      orderIndex: i
    }));

    this.dashboardService.reorderCharts(reorderList).subscribe(
      () => {},
      error => {
        console.log(error);
      }
    );
  }

}
