import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ViewEncapsulation } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';
import { SelectItem } from 'src/app/_models/resourceModels/resourceDto';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ChartType, DashboardDto, SourceType } from 'src/app/_models/dashboard/dashboardDto';

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
  chartName:string="";

  
  constructor(protected ref: NbDialogRef<DashboardDialogComponent>, private resourceService: ResourceService,
     private resourceGroupService: ResourceGroupService, private dashboardService: DashboardService) {}
  
  
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
    let dashboardDto : DashboardDto;
    dashboardDto = this.fillDtoWithData(dashboardDto);
    this.dashboardService.createDashboardChart(dashboardDto).subscribe(
      resData => {
        ///this.isLoading = false;
        //this.resourceGroupService.reloadTrigger.next(true);
        this.cancel();
        location.reload();
      }, 
      error => {
        //this.isLoading = false;
        console.log(error);
      }
    );
    console.log(this.selectedOption)
    console.log(this.radioGroupValue)
    console.log(this.radioGroupChartType)
  }

  fillDtoWithData(dashboardDto: DashboardDto){
    dashboardDto = new DashboardDto();
    dashboardDto.chartName = this.chartName;
    if (this.radioGroupValue == "Resource"){
      dashboardDto.sourceType = SourceType.Resource;
    }
    else if (this.radioGroupValue == "ResourceGroup"){
      dashboardDto.sourceType = SourceType.ResourceGroup;
    }


    if (this.radioGroupChartType == "Pie"){
      dashboardDto.chartType = ChartType.Pie;
    }
    else if (this.radioGroupChartType == "Bar"){
      dashboardDto.chartType = ChartType.Bar;
    }
    else if (this.radioGroupChartType == "Line"){
      dashboardDto.chartType = ChartType.Line;
    }

    dashboardDto.sourceId = this.selectedOption;
    return dashboardDto;
  }
}
