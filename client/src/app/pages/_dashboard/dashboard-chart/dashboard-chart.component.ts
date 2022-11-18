import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { LineChartData, LineRawData } from 'src/app/_models/chartData/lineChartData';
import { PieChartData, PieRawData } from 'src/app/_models/chartData/pieChartData';
import { ChartType, DashboardDto } from 'src/app/_models/dashboard/dashboardDto';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {
  @Input() chartInfo : DashboardDto;
  faTrashCan = faTrashCan;
  chartTypePie =  ChartType.Pie;
  chartTypeLine = ChartType.Line;
  isLoading = true;
  pieChartData: PieChartData;
  lineChartData: LineChartData;
  constructor(private resourceService: ResourceService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(){
    this.isLoading = true;
    this.dashboardService.getChartData(this.chartInfo.dashboardChartId).subscribe(
      resData => {
        console.log("chartoseeee")
        console.log(this.chartInfo.chartType === this.chartTypePie )
        console.log(resData);
        if(resData.resourcesDto.length>0)
        {
          this.pieChartData = this.constructPieChartData(resData.resourcesDto);
        }
        else if(resData.snapshotsDto.length>0)
        {
          this.lineChartData = this.constructLineChartData(resData.snapshotsDto);
        }
        this.isLoading = false;
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  
  constructLineChartData(data : SnapshotDto[]){
    let chartData = new LineChartData();
    chartData.legend.push('Resource movement');
    let numberData = [];
    let dateLabels = []
    data.forEach(element => {
      numberData.push(element.amount);
      dateLabels.push(element.dateOfSnapshot.toString().split('T')[0]);   
    });
    dateLabels.reverse();
    numberData.reverse();
    chartData.xAxisLabels = dateLabels;
    chartData.data.push(new LineRawData("Resource movement", numberData));
    console.log(chartData);
    return chartData;
  } 

  constructPieChartData(data : ResourceDto[]){
    let chartData = new PieChartData();
    chartData.legend = data.map(a=>a.name);
    data.forEach(element => {
      chartData.data.push(new PieRawData(element.name, element.amount))
    });
    console.log("cumsem")
    console.log(chartData);
    return chartData;
  } 

  deleteChart(){
    console.log("I am HITEEEEED")
    this.dashboardService.deleteDashboardChart(this.chartInfo.dashboardChartId).subscribe(
      resData => {
        location.reload();
      }, 
      error => {
        console.log(error);
      }
    )
  }

}
