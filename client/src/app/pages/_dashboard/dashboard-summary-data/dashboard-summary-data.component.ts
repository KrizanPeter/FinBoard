import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FinancialGoalService } from 'src/app/services/financialGoal/financialGoal.service';
import { DashboardOverviewDto } from 'src/app/_models/dashboard/dashboardOverviewDto';
import { FinancialGoalDto } from 'src/app/_models/financialGoalModels/financialGoalDto';

export interface OverviewRow {
  name: string;
  amount: number;
  percentageMove: number;
  isRising: boolean;
  resourceType: string;
  goal: FinancialGoalDto | null;
}

@Component({
  selector: 'app-dashboard-summary-data',
  templateUrl: './dashboard-summary-data.component.html',
  styleUrls: ['./dashboard-summary-data.component.scss']
})
export class DashboardSummaryDataComponent implements OnInit {

  rows: OverviewRow[] = [];
  isLoading: boolean = true;
  totalValue: number = 0;
  hasAnyGoal: boolean = false;

  private overviewData: DashboardOverviewDto[] = [];
  private goals: FinancialGoalDto[] = [];
  private overviewLoaded = false;
  private goalsLoaded = false;

  constructor(
    private dashboardService: DashboardService,
    private financialGoalService: FinancialGoalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadGoals();
  }

  loadData() {
    this.dashboardService.getOverviewData().subscribe(
      resData => {
        this.overviewData = resData;
        this.overviewLoaded = true;
        this.tryBuildRows();
      },
      error => {
        this.overviewLoaded = true;
        this.tryBuildRows();
        console.log(error);
      }
    );
  }

  loadGoals() {
    this.financialGoalService.getGoals().subscribe(
      resData => {
        this.goals = resData;
        this.goalsLoaded = true;
        this.tryBuildRows();
      },
      error => {
        this.goalsLoaded = true;
        this.tryBuildRows();
        console.log(error);
      }
    );
  }

  private tryBuildRows() {
    if (!this.overviewLoaded || !this.goalsLoaded) return;

    this.totalValue = this.overviewData.reduce((sum, r) => sum + r.amount, 0);

    // Build a map: targetName -> nearest goal (smallest positive remainingDays, or overdue)
    const goalMap = new Map<string, FinancialGoalDto>();
    for (const goal of this.goals) {
      const existing = goalMap.get(goal.targetName);
      if (!existing || this.isNearer(goal, existing)) {
        goalMap.set(goal.targetName, goal);
      }
    }

    // Build rows from overview data, attaching matching goal
    const matchedGoalNames = new Set<string>();
    this.rows = this.overviewData.map(record => {
      const goal = goalMap.get(record.name) || null;
      if (goal) matchedGoalNames.add(record.name);
      return {
        name: record.name,
        amount: record.amount,
        percentageMove: record.percentageMove,
        isRising: record.isRising,
        resourceType: record.resourceType,
        goal: goal
      };
    });

    // Add resource group goals not already matched to a resource row
    for (const [name, goal] of goalMap.entries()) {
      if (!matchedGoalNames.has(name) && goal.resourceGroupId) {
        this.rows.push({
          name: name,
          amount: goal.currentValue,
          percentageMove: 0,
          isRising: true,
          resourceType: 'group',
          goal: goal
        });
      }
    }

    this.hasAnyGoal = this.rows.some(r => r.goal !== null);
    this.isLoading = false;
  }

  private isNearer(a: FinancialGoalDto, b: FinancialGoalDto): boolean {
    // Prefer non-overdue over overdue
    if (a.remainingDays > 0 && b.remainingDays <= 0) return true;
    if (a.remainingDays <= 0 && b.remainingDays > 0) return false;
    // Among non-overdue, pick the nearest
    return a.remainingDays < b.remainingDays;
  }

  getProgressStatus(percentage: number): string {
    if (percentage >= 100) return 'success';
    if (percentage >= 60) return 'info';
    if (percentage >= 30) return 'warning';
    return 'danger';
  }

  navigateToGoals() {
    this.router.navigate(['/financial-goals']);
  }
}
