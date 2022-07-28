import { Component, Input, OnInit } from '@angular/core';
import { DashboardDto } from 'src/app/_models/dashboard/dashboardDto';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {
  @Input() chartInfo : DashboardDto;
  constructor() { }

  ngOnInit(): void {
  }

}
