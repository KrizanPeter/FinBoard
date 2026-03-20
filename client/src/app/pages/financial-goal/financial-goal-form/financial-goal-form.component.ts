import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';
import { ResourceGroupDto } from 'src/app/_models/resourceGroupModels/resourceGroupDto';
import { FinancialGoalService } from 'src/app/services/financialGoal/financialGoal.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceGroupService } from 'src/app/services/resourceGroup/resourceGroup.service';

@Component({
  selector: 'app-financial-goal-form',
  templateUrl: './financial-goal-form.component.html',
  styleUrls: ['./financial-goal-form.component.scss']
})
export class FinancialGoalFormComponent implements OnInit {
  isLoading = false;
  goalType: string = 'resource';
  resources: ResourceDto[] = [];
  resourceGroups: ResourceGroupDto[] = [];
  selectedEntityId: string = '';
  targetValue: number | null = null;
  dueDate: Date | null = null;

  constructor(
    private financialGoalService: FinancialGoalService,
    private resourceService: ResourceService,
    private resourceGroupService: ResourceGroupService
  ) { }

  ngOnInit(): void {
    this.loadResources();
    this.loadResourceGroups();
  }

  loadResources() {
    this.resourceService.getResources().subscribe(
      resData => {
        this.resources = resData;
      }
    );
  }

  loadResourceGroups() {
    this.resourceGroupService.getResourceGroups().subscribe(
      resData => {
        this.resourceGroups = resData;
      }
    );
  }

  onGoalTypeChange() {
    this.selectedEntityId = '';
  }

  onSubmit(form: NgForm) {
    if (!this.selectedEntityId || !this.targetValue || !this.dueDate) {
      return;
    }

    this.isLoading = true;

    const resourceId = this.goalType === 'resource' ? this.selectedEntityId : null;
    const resourceGroupId = this.goalType === 'resourceGroup' ? this.selectedEntityId : null;
    const dueDateStr = new Date(this.dueDate).toISOString();

    this.financialGoalService.createGoal(resourceId, resourceGroupId, this.targetValue, dueDateStr).subscribe(
      resData => {
        this.isLoading = false;
        this.financialGoalService.reloadTrigger.next(true);
        this.selectedEntityId = '';
        this.targetValue = null;
        this.dueDate = null;
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
