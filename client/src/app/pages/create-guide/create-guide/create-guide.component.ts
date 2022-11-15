import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceTemplateComponent } from '../../resources/resource-template/resource-template.component';
import { SnapshotAgregateComponent } from '../../snapshot-agregate/snapshot-agregate/snapshot-agregate.component';

@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.scss']
})
export class CreateGuideComponent implements OnInit {
  @ViewChild(ResourceTemplateComponent) resourceTemplate:ResourceTemplateComponent;
  @ViewChild(SnapshotAgregateComponent) aggregateTemplate:SnapshotAgregateComponent;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  refreshTemplates(){
    this.resourceTemplate.ngOnInit();
    this.aggregateTemplate.ngOnInit();
  }

  navigateToDashboardPage(){
    this.router.navigateByUrl("/dashboard");
  }
}
