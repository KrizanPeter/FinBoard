import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { PieChartData, PieRawData } from 'src/app/_models/chartData/pieChartData';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit, OnDestroy {
  @Output() resourceExist = new EventEmitter<boolean>();
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  private resourceListSub : Subscription;
  resoucesList: ResourceDto[];
  isLoading = false;
  pieChartData: PieChartData;
  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit(): void {
    this.resourceListSub = this.resourceService.reloadTrigger.subscribe(
      trigger=>{
        if(trigger === true){
          console.log("Trigger reload resourcelist.")
          this.loadResources();
        }
      });
    }

  loadResources(){
    this.isLoading = true;
    this.resourceService.getResources().subscribe(
      resData => {
        this.resolveValidityForStepper(resData);
        this.isLoading = false;
        this.resoucesList = resData;
        this.pieChartData = this.constructChartData(resData);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  resolveValidityForStepper(resData: ResourceDto[]) {
    console.log("list resolver");

    if(resData.length>0){
      this.resourceExist.emit(true);
    }
    else{
      this.resourceExist.emit(false);
    }
  }
  
  constructChartData(data : ResourceDto[]){
    let chartData = new PieChartData();
    chartData.legend = data.map(a=>a.name);
    data.forEach(element => {
      chartData.data.push(new PieRawData(element.name, element.amount))
    });
    return chartData;
  } 

  ngOnDestroy(): void {
    if(this.resourceListSub){
    this.resourceListSub.unsubscribe();
    }
  }

  deleteClick(resourceId: string){
    this.resourceService.deleteResource(resourceId).subscribe(
      resData => {
        this.loadResources();
      }, 
      error => {
        console.log(error);
      }
    )
  }
}
