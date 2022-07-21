import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { SnapshotService } from 'src/app/services/snapshot/snapshot.service';
import { LineChartData, LineRawData } from 'src/app/_models/chartData/lineChartData';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss']
})
export class SnapshotListComponent implements OnInit {
  isLoading = false;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  private snapshotListSub : Subscription;
  snapshotList: SnapshotDto[];
  lineChartData: LineChartData;

  constructor(private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.subscribeTableData();
  }

  ngOnDestroy(): void {
    if(this.snapshotListSub){
    this.snapshotListSub.unsubscribe();
    }
  }

  subscribeTableData(){
    this.snapshotListSub = this.snapshotService.reloadTrigger.subscribe(
      resourceId=>{
        this.loadTableData(resourceId);
      }
    )
  }

  loadTableData(resourceId:string){
    this.isLoading = true;
    this.snapshotService.getSnapshots(resourceId).subscribe(
      resData => {
        console.log(resData);
        this.snapshotList = resData;
        this.isLoading = false;
        this.lineChartData = this.constructChartData(resData);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  constructChartData(data : SnapshotDto[]){
    let chartData = new LineChartData();
    chartData.legend.push('Resource movement');
    let numberData = [];
    let dateLabels = []
    data.forEach(element => {
      numberData.push(element.amount);
      dateLabels.push(element.dateOfChange.toString().split('T')[0]);   
    });
    dateLabels.reverse();
    numberData.reverse();
    chartData.xAxisLabels = dateLabels;
    chartData.data.push(new LineRawData("Resource movement", numberData));
    console.log(chartData);
    return chartData;
  } 

  deleteClick(snapshotId: string){
    console.log(snapshotId);
    this.snapshotService.deleteSnapshot(snapshotId).subscribe(
      resData => {
        this.snapshotListSub.unsubscribe();
        this.subscribeTableData();
      }, 
      error => {
        console.log(error);
      }
    )
  }

}
