import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';
import { ResourceGroupDto } from 'src/app/_models/resourceGroupModels/resourceGroupDto';
import { GroupResourcesDto } from 'src/app/_models/resourceGroupModels/resourceGroupMap';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';

@Component({
  selector: 'app-resource-group-map',
  templateUrl: './resource-group-map.component.html',
  styleUrls: ['./resource-group-map.component.scss']
})
export class ResourceGroupMapComponent implements OnInit, AfterViewInit {
  isLoading = false;
  resouceGroupsList: ResourceGroupDto[];
  resouceList: ResourceDto[];
  resourceGroupMapList: GroupResourcesDto = new GroupResourcesDto();
  selectedOption = "";
  preselectOption = "";
  private resourcesForGroupSub : Subscription;
  constructor(private resourceGroupService: ResourceGroupService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResourceGroups();
  }

  ngAfterViewInit():void{
    //this.subscribeTableData();    
  }


  onSubmit(form : NgForm){
    console.log("form");
    console.log(this.resourceGroupMapList)
    this.resourceGroupService.setResourceToGroup(this.resourceGroupMapList).subscribe(
      resData => {
        this.isLoading = false;
        this.resourceGroupService.reloadForResourceGroupMapperTrigger.next(true);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.resourcesForGroupSub){
    this.resourcesForGroupSub.unsubscribe();
    }
  }

  subscribeTableData(){
    this.resourcesForGroupSub = this.resourceGroupService.reloadForResourceGroupMapperTrigger.subscribe(
      resourceId=>{
        //this.loadResources();
      }
    )
  }

  loadResourceGroups(){
    this.isLoading = true;
    this.resourceGroupService.getResourceGroups().subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.resouceGroupsList = resData;
        this.selectedOption = resData[0].resourceGroupId;
        this.preselectOption = this.selectedOption;
        this.loadResourcesCheckboxes();
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  loadResourcesCheckboxes() {
    this.isLoading = true;
    this.resourceGroupService.getResourceForGroup(this.selectedOption).subscribe(
      resData => {
        console.log(resData);
        this.resourceGroupMapList = resData;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSelectChange(form : NgForm){
    console.log("selected >>> " + this.selectedOption.toString());
    this.loadResourcesCheckboxes();
  }

}
