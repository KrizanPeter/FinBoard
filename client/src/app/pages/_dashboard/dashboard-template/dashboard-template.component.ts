import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { DashboardDto } from 'src/app/_models/dashboard/dashboardDto';

@Component({
  selector: 'app-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.scss']
})
export class DashboardTemplateComponent implements OnInit {

  dashboardChartInfo: DashboardDto[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboards().subscribe(
      resData => {
        //this.isLoading = false;
        console.log(resData);
        this.dashboardChartInfo = resData;
      }, 
      error => {
        //this.isLoading = false;
        console.log(error);
      }
    );
  }

}
