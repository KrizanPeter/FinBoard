import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { FinancialGoalDto } from 'src/app/_models/financialGoalModels/financialGoalDto';
import { FinancialGoalService } from 'src/app/services/financialGoal/financialGoal.service';

@Component({
  selector: 'app-financial-goal-list',
  templateUrl: './financial-goal-list.component.html',
  styleUrls: ['./financial-goal-list.component.scss']
})
export class FinancialGoalListComponent implements OnInit, OnDestroy {

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  private goalListSub: Subscription;
  goalsList: FinancialGoalDto[] = [];
  isLoading = false;

  constructor(private financialGoalService: FinancialGoalService) { }

  ngOnInit(): void {
    this.goalListSub = this.financialGoalService.reloadTrigger.subscribe(
      trigger => {
        if (trigger === true) {
          this.loadGoals();
        }
      });
  }

  loadGoals() {
    this.isLoading = true;
    this.financialGoalService.getGoals().subscribe(
      resData => {
        this.isLoading = false;
        this.goalsList = resData;
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  deleteClick(financialGoalId: string) {
    this.financialGoalService.deleteGoal(financialGoalId).subscribe(
      resData => {
        this.loadGoals();
      },
      error => {
        console.log(error);
      }
    );
  }

  editClick(goal: FinancialGoalDto) {
    this.financialGoalService.editGoal.next(goal);
  }

  getProgressStatus(percentage: number): string {
    if (percentage >= 100) return 'success';
    if (percentage >= 60) return 'info';
    if (percentage >= 30) return 'warning';
    return 'danger';
  }

  ngOnDestroy(): void {
    if (this.goalListSub) {
      this.goalListSub.unsubscribe();
    }
  }
}
