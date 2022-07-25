import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ViewEncapsulation } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';
import { SelectItem } from 'src/app/_models/resourceModels/resourceDto';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dashboard-dialog.component.html',
  styleUrls: ['dashboard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class DashboardDialogComponent implements OnInit  {
  radioGroupValue = "";
  radioGroupChartType= "";
  selectedOption = "";
  resourceOptions : SelectItem[] = [];
  resourceGroupOptions : SelectItem[] = [];
  finalOptions : SelectItem[] = [];

  
  constructor(protected ref: NbDialogRef<DashboardDialogComponent>, private resourceService: ResourceService, private resourceGroupService: ResourceGroupService) {}
  
  
  ngOnInit(): void {
    this.loadResource();
    this.loadResourceGroups();
  }

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

  loadResource(){
    this.resourceOptions = [];
    this.resourceService.getResources().subscribe(
      resData => {
        this.selectedOption = resData[0].resourceId;
        console.log(resData);
        resData.forEach(element => {
          this.resourceOptions.push(new SelectItem(element.resourceId, element.name))
        });
      }, 
      error => {
        console.log(error);
      }
    );
  }

  loadResourceGroups(){
    this.resourceGroupOptions = [];
    this.resourceGroupService.getResourceGroups().subscribe(
      resData => {
        this.selectedOption = resData[0].resourceGroupId;
        console.log(resData)
        resData.forEach(element => {
          this.resourceGroupOptions.push(new SelectItem(element.resourceGroupId, element.resourceGroupName))
        });       
      }, 
      error => {
        console.log(error);
      }
    );
  }


  sourceTypeReloadGroups(value: string){
    this.radioGroupValue = value;
    console.log(this.resourceGroupOptions);
    this.finalOptions=[];
    this.finalOptions = this.resourceGroupOptions;
  }

  sourceTypeReloadResources(value: string){
    this.radioGroupValue = value;
    console.log(this.resourceOptions);

    this.finalOptions=[];
    this.finalOptions = this.resourceOptions;

  }

  chartTypeRadioValue(value:string){
    this.radioGroupChartType = value;
  }

  OnSubmit(){
    console.log(this.selectedOption)
    console.log(this.radioGroupValue)
    console.log(this.radioGroupChartType)
  }
}
