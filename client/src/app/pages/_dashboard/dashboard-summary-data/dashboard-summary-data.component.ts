import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { DashboardOverviewDto } from 'src/app/_models/dashboard/dashboardOverviewDto';

@Component({
  selector: 'app-dashboard-summary-data',
  templateUrl: './dashboard-summary-data.component.html',
  styleUrls: ['./dashboard-summary-data.component.scss']
})
export class DashboardSummaryDataComponent implements OnInit {

  overviewData:DashboardOverviewDto[];
  isLoading:boolean = true;
  overviewDataCount:number;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.dashboardService.getOverviewData().subscribe(
      resData => {
        console.log("dashData")
        console.log(resData);
        this.overviewData = resData;
        this.overviewDataCount = this.overviewData.length;
        console.log(this.overviewDataCount)
        this.isLoading = false;
      }, 
      error => {
        //this.isLoading = false;
        console.log(error);
      }
    );
  }

}
