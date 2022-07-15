import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';

@Component({
  selector: 'app-resource-group-form',
  templateUrl: './resource-group-form.component.html',
  styleUrls: ['./resource-group-form.component.scss']
})
export class ResourceGroupFormComponent implements OnInit {
  isLoading = false;

  constructor(private resourceGroupService: ResourceGroupService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    console.log(form);
    this.resourceGroupService.createResourceGroup(form.value.inputResourceGroupName).subscribe(
      resData => {
        this.isLoading = false;
        this.resourceGroupService.reloadTrigger.next(true);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    form.reset();
  }

}
