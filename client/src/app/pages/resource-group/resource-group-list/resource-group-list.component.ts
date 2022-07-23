import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';
import { ResourceGroupDto } from 'src/app/_models/resourceGroupModels/resourceGroupDto';

@Component({
  selector: 'app-resource-group-list',
  templateUrl: './resource-group-list.component.html',
  styleUrls: ['./resource-group-list.component.scss']
})
export class ResourceGroupListComponent implements OnInit {

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  private resourceListSub : Subscription;
  resouceGroupsList: ResourceGroupDto[];
  isLoading = false;

  constructor(private resourceGroupService: ResourceGroupService, private router: Router) { }

  ngOnInit(): void {
    this.resourceListSub = this.resourceGroupService.reloadTrigger.subscribe(
      trigger=>{
        if(trigger === true){
          console.log("Trigger reload resourcelist.")
          this.loadResources();
        }
      });
    }

  loadResources(){
    this.isLoading = true;
    this.resourceGroupService.getResourceGroups().subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.resouceGroupsList = resData;
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  deleteClick(resourceGroupId: string){
    this.resourceGroupService.deleteResourceGroup(resourceGroupId).subscribe(
      resData => {
        this.loadResources();
      }, 
      error => {
        console.log(error);
      }
    )
  }
  
  ngOnDestroy(): void {
    if (this.resourceListSub){
    this.resourceListSub.unsubscribe();
    }
  }
}
