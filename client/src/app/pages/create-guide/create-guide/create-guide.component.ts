import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceGroupTemplateComponent } from '../../resource-group/resource-group-template/resource-group-template.component';
import { ResourceTemplateComponent } from '../../resources/resource-template/resource-template.component';
import { SnapshotAgregateComponent } from '../../snapshot-agregate/snapshot-agregate/snapshot-agregate.component';

@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.scss']
})
export class CreateGuideComponent implements OnInit {
  @ViewChild(ResourceTemplateComponent) resourceTemplate:ResourceTemplateComponent;
  @ViewChild(ResourceGroupTemplateComponent) resourceGroupTemplate:ResourceTemplateComponent;
  @ViewChild(SnapshotAgregateComponent) aggregateTemplate:SnapshotAgregateComponent;
  isGroupStepAvailable:boolean = false;
  isDashboardStepAvailable:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  refreshResourceTemplates(){
    this.resourceTemplate.ngOnInit();
    this.resourceGroupTemplate.ngOnInit();
  }

  refreshAggregateFormTemplate(){
    this.aggregateTemplate.ngOnInit();
  }

  navigateToDashboardPage(){
    this.router.navigateByUrl("/dashboard");
  }

  resolveGroupStepValidity(data: boolean){
    this.isGroupStepAvailable = data;
  }

  resolveDashboardStepValidity(data: boolean){
    console.log('tudle nudle')
    console.log(!data)

    this.isDashboardStepAvailable = !data;
  }
}
