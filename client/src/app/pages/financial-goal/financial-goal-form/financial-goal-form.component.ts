import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FinancialGoalDto } from 'src/app/_models/financialGoalModels/financialGoalDto';
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
export class FinancialGoalFormComponent implements OnInit, OnDestroy {
  isLoading = false;
  isEditMode = false;
  editingGoalId: string | null = null;
  goalType: string = 'resource';
  resources: ResourceDto[] = [];
  resourceGroups: ResourceGroupDto[] = [];
  selectedEntityId: string = '';
  targetValue: number | null = null;
  dueDate: Date | null = null;

  private editSub: Subscription;

  constructor(
    private financialGoalService: FinancialGoalService,
    private resourceService: ResourceService,
    private resourceGroupService: ResourceGroupService
  ) { }

  ngOnInit(): void {
    this.loadResources();
    this.loadResourceGroups();

    this.editSub = this.financialGoalService.editGoal.subscribe(goal => {
      if (goal) {
        this.prefillForm(goal);
      }
    });
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

  prefillForm(goal: FinancialGoalDto) {
    this.isEditMode = true;
    this.editingGoalId = goal.financialGoalId;
    this.goalType = goal.resourceId ? 'resource' : 'resourceGroup';
    this.selectedEntityId = goal.resourceId || goal.resourceGroupId || '';
    this.targetValue = goal.targetValue;
    this.dueDate = new Date(goal.dueDate);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingGoalId = null;
    this.selectedEntityId = '';
    this.targetValue = null;
    this.dueDate = null;
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

    if (this.isEditMode && this.editingGoalId) {
      this.financialGoalService.updateGoal(this.editingGoalId, resourceId, resourceGroupId, this.targetValue, dueDateStr).subscribe(
        resData => {
          this.isLoading = false;
          this.cancelEdit();
          this.financialGoalService.reloadTrigger.next(true);
        },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      );
    } else {
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

  ngOnDestroy(): void {
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }
}
