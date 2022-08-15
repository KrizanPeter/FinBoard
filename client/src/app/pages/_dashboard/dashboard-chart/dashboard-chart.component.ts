import { Component, Input, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { PieChartData, PieRawData } from 'src/app/_models/chartData/pieChartData';
import { DashboardDto } from 'src/app/_models/dashboard/dashboardDto';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {
  @Input() chartInfo : DashboardDto;
  resoucesList: ResourceDto[];
  isLoading = true;
  pieChartData: PieChartData;
  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(){
    this.isLoading = true;
    this.resourceService.getResources().subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.resoucesList = resData;
        this.pieChartData = this.constructChartData(resData);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  

  constructChartData(data : ResourceDto[]){
    let chartData = new PieChartData();
    chartData.legend = data.map(a=>a.name);
    data.forEach(element => {
      chartData.data.push(new PieRawData(element.name, element.amount))
    });
    console.log("cumsem")
    console.log(chartData);
    return chartData;
  } 

}
