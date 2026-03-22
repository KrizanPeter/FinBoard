import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FinancialGoalService } from 'src/app/services/financialGoal/financialGoal.service';
import { LineChartData, LineRawData } from 'src/app/_models/chartData/lineChartData';
import { SourceType } from 'src/app/_models/dashboard/dashboardDto';
import { FinancialGoalDto } from 'src/app/_models/financialGoalModels/financialGoalDto';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';

@Component({
  selector: 'app-goal-prediction-page',
  templateUrl: './goal-prediction-page.component.html',
  styleUrls: ['./goal-prediction-page.component.scss']
})
export class GoalPredictionPageComponent implements OnInit, OnDestroy {
  chartName: string = '';
  goal: FinancialGoalDto;
  predictionOptions: any = {};
  estimatedDate: string = '';
  isLoading: boolean = true;
  themeSubscription: any;
  sourceTypeLabel: string = '';
  achievementClass: string = '';
  achievementIcon: string = 'trending-up-outline';
  goalVerdict: string = '';
  verdictReason: string = '';
  verdictEstimated: string = '';
  verdictDelay: string = '';

  private dashboardChartId: string;
  private lineChartData: LineChartData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private theme: NbThemeService,
    private dashboardService: DashboardService,
    private financialGoalService: FinancialGoalService
  ) {}

  ngOnInit(): void {
    this.dashboardChartId = this.route.snapshot.paramMap.get('dashboardChartId');
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  editGoal() {
    this.router.navigate(['/financial-goals']);
  }

  private loadData() {
    forkJoin({
      dashboards: this.dashboardService.getDashboards(),
      chartData: this.dashboardService.getChartData(this.dashboardChartId),
      goals: this.financialGoalService.getGoals()
    }).subscribe(
      ({ dashboards, chartData, goals }) => {
        const chartInfo = dashboards.find(d => d.dashboardChartId === this.dashboardChartId);
        if (!chartInfo) {
          this.router.navigate(['/dashboard']);
          return;
        }

        this.chartName = chartInfo.chartName;
        this.sourceTypeLabel = chartInfo.sourceType === SourceType.ResourceGroup ? 'Resource Group' : 'Resource';

        if (chartData.snapshotsDto && chartData.snapshotsDto.length > 0) {
          this.lineChartData = this.constructLineChartData(chartData.snapshotsDto);
        }

        this.goal = goals.find(g => {
          if (chartInfo.sourceType === SourceType.Resource) {
            return g.resourceId === chartInfo.sourceId;
          } else if (chartInfo.sourceType === SourceType.ResourceGroup) {
            return g.resourceGroupId === chartInfo.sourceId;
          }
          return false;
        });

        if (!this.goal || !this.lineChartData) {
          this.router.navigate(['/dashboard']);
          return;
        }

        this.buildPredictionChart();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.router.navigate(['/dashboard']);
      }
    );
  }

  private constructLineChartData(data: SnapshotDto[]): LineChartData {
    let chartData = new LineChartData();
    chartData.legend.push('Resource movement');
    let numberData = [];
    let dateLabels = [];
    data.forEach(element => {
      numberData.push(element.amount);
      dateLabels.push(element.dateOfSnapshot.toString().split('T')[0]);
    });
    dateLabels.reverse();
    numberData.reverse();
    chartData.xAxisLabels = dateLabels;
    chartData.data.push(new LineRawData('Resource movement', numberData));
    return chartData;
  }

  private buildPredictionChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;

      const labels = this.lineChartData.xAxisLabels;
      const values = this.lineChartData.data[0]?.data || [];

      if (values.length < 2) {
        return;
      }

      const n = values.length;

      const timestamps = labels.map(l => new Date(l).getTime());
      const t0 = timestamps[0];
      const msPerDay = 86400000;
      const xDays = timestamps.map(t => (t - t0) / msPerDay);

      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      for (let i = 0; i < n; i++) {
        sumX += xDays[i];
        sumY += values[i];
        sumXY += xDays[i] * values[i];
        sumX2 += xDays[i] * xDays[i];
      }
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      const goalValue = this.goal.targetValue;
      const lastDay = xDays[n - 1];
      const lastTrendValue = intercept + slope * lastDay;
      let futureSteps = 0;

      if (slope > 0 && goalValue > lastTrendValue) {
        const daysToGoal = (goalValue - intercept) / slope - lastDay;
        futureSteps = Math.ceil(daysToGoal / 30);
        futureSteps = Math.min(futureSteps + 3, 60);
      } else if (slope <= 0 && goalValue > lastTrendValue) {
        futureSteps = 12;
      } else {
        futureSteps = 6;
      }

      const allLabels = [...labels];
      const trendData: (number | null)[] = [];

      for (let i = 0; i < n; i++) {
        trendData.push(Math.round(intercept + slope * xDays[i]));
      }

      const lastDate = new Date(labels[labels.length - 1]);
      const firstDate = new Date(labels[0]);
      const avgIntervalMs = (lastDate.getTime() - firstDate.getTime()) / Math.max(1, n - 1);

      for (let i = 1; i <= futureSteps; i++) {
        const futureDate = new Date(lastDate.getTime() + avgIntervalMs * i);
        allLabels.push(futureDate.toISOString().split('T')[0]);
        const futureDays = (futureDate.getTime() - t0) / msPerDay;
        trendData.push(Math.round(intercept + slope * futureDays));
      }

      if (slope > 0 && goalValue > lastTrendValue) {
        const goalDays = (goalValue - intercept) / slope;
        const goalDate = new Date(t0 + goalDays * msPerDay);
        this.estimatedDate = goalDate.toISOString().split('T')[0];

        if (this.goal.dueDate) {
          const dueDate = new Date(this.goal.dueDate);
          if (goalDate <= dueDate) {
            this.achievementClass = 'status-on-track';
            this.achievementIcon = 'checkmark-circle-2-outline';
            this.goalVerdict = 'On track';
            this.verdictReason = 'Goal is reachable by due date';
            this.verdictEstimated = this.estimatedDate;
            this.verdictDelay = '';
          } else {
            this.achievementClass = 'status-not-achievable';
            this.achievementIcon = 'alert-triangle-outline';
            const delayDays = Math.round((goalDate.getTime() - dueDate.getTime()) / msPerDay);
            this.goalVerdict = 'Goal at risk';
            this.verdictReason = 'Will miss due date';
            this.verdictEstimated = this.estimatedDate;
            this.verdictDelay = delayDays + ' days late';
          }
        } else {
          this.achievementClass = 'status-achievable';
          this.achievementIcon = 'trending-up-outline';
          this.goalVerdict = 'Goal is reachable';
          this.verdictReason = 'No due date set';
          this.verdictEstimated = this.estimatedDate;
          this.verdictDelay = '';
        }
      } else if (goalValue <= lastTrendValue) {
        this.estimatedDate = 'Already on track!';
        this.achievementClass = 'status-on-track';
        this.achievementIcon = 'checkmark-circle-2-outline';
        this.goalVerdict = 'Goal already reached';
        this.verdictReason = 'Current trend exceeds the target';
        this.verdictEstimated = '';
        this.verdictDelay = '';
      } else {
        this.estimatedDate = 'Not achievable with current trend';
        this.achievementClass = 'status-not-achievable';
        this.achievementIcon = 'alert-triangle-outline';
        this.goalVerdict = 'Goal is not reachable';
        this.verdictReason = 'Current trend does not lead to the target';
        this.verdictEstimated = '';
        this.verdictDelay = '';
      }

      const historicalData: (number | null)[] = [...values];
      for (let i = 0; i < futureSteps; i++) {
        historicalData.push(null);
      }

      const maxPoints = 15;
      let xLabels = allLabels;
      let histSeries = historicalData;
      let trendSeries = trendData;

      if (allLabels.length > maxPoints) {
        const totalPts = allLabels.length;
        const lastHistIdx = n - 1;
        const indicesSet = new Set<number>();
        for (let i = 0; i < maxPoints; i++) {
          indicesSet.add(Math.round(i * (totalPts - 1) / (maxPoints - 1)));
        }
        indicesSet.add(lastHistIdx);
        const indices = Array.from(indicesSet).sort((a, b) => a - b);
        xLabels = indices.map(i => allLabels[i]);
        histSeries = indices.map(i => historicalData[i]);
        trendSeries = indices.map(i => trendData[i]);
      }

      const goalSeries = xLabels.map(() => goalValue);

      this.predictionOptions = {
        backgroundColor: echarts.bg,
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let result = params[0].name + '<br/>';
            params.forEach(p => {
              if (p.value != null) {
                result += `${p.marker} ${p.seriesName}: ${Math.round(p.value).toLocaleString()}<br/>`;
              }
            });
            return result;
          }
        },
        legend: {
          left: 'left',
          data: ['Historical', 'Trend', 'Goal'],
          textStyle: { color: echarts.textColor }
        },
        xAxis: [{
          type: 'category',
          data: xLabels,
          axisTick: { alignWithLabel: true },
          axisLine: { lineStyle: { color: echarts.axisLineColor } },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45,
            textStyle: { color: echarts.textColor }
          }
        }],
        yAxis: [{
          type: 'value',
          boundaryGap: false,
          axisLine: { lineStyle: { color: echarts.axisLineColor } },
          splitLine: { lineStyle: { color: echarts.splitLineColor } },
          axisLabel: {
            formatter: (value) => Math.round(value).toLocaleString(),
            textStyle: { color: echarts.textColor }
          }
        }],
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: 'Historical',
            type: 'line',
            data: histSeries,
            smooth: true,
            itemStyle: { color: '#598bff' },
            lineStyle: { color: '#598bff' },
            areaStyle: { color: '#598bff', opacity: 0.1 },
            connectNulls: false,
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: (params) => params.value != null ? Math.round(params.value).toLocaleString() : '',
              },
            },
          },
          {
            name: 'Trend',
            type: 'line',
            data: trendSeries,
            smooth: false,
            lineStyle: { color: '#ffaa00', type: 'dashed', width: 2 },
            itemStyle: { color: '#ffaa00' },
            symbol: 'none',
            label: { show: false },
          },
          {
            name: 'Goal',
            type: 'line',
            data: goalSeries,
            smooth: false,
            lineStyle: { color: '#ff3d71', width: 2, type: 'solid' },
            itemStyle: { color: '#ff3d71' },
            symbol: 'none',
            label: { show: false },
          }
        ]
      };
    });
  }
}
