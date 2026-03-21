import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { LineChartData } from 'src/app/_models/chartData/lineChartData';
import { FinancialGoalDto } from 'src/app/_models/financialGoalModels/financialGoalDto';

@Component({
  selector: 'app-goal-prediction-dialog',
  templateUrl: './goal-prediction-dialog.component.html',
  styleUrls: ['./goal-prediction-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GoalPredictionDialogComponent implements OnInit, OnDestroy {
  chartName: string = '';
  originalChartData: LineChartData;
  goal: FinancialGoalDto;
  predictionOptions: any = {};
  estimatedDate: string = '';
  themeSubscription: any;

  constructor(
    protected ref: NbDialogRef<GoalPredictionDialogComponent>,
    private theme: NbThemeService
  ) {}

  ngOnInit(): void {
    this.buildPredictionChart();
  }

  close() {
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private buildPredictionChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;

      const labels = this.originalChartData.xAxisLabels;
      const values = this.originalChartData.data[0]?.data || [];

      if (values.length < 2) {
        return;
      }

      const n = values.length;

      // Convert date labels to days from first date for time-based regression
      const timestamps = labels.map(l => new Date(l).getTime());
      const t0 = timestamps[0];
      const msPerDay = 86400000;
      const xDays = timestamps.map(t => (t - t0) / msPerDay);

      // Linear regression on (days, value)
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

      // Build extended labels and trend data
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

      // Estimate achievement date
      if (slope > 0 && goalValue > lastTrendValue) {
        const goalDays = (goalValue - intercept) / slope;
        const goalDate = new Date(t0 + goalDays * msPerDay);
        this.estimatedDate = goalDate.toISOString().split('T')[0];
      } else if (goalValue <= lastTrendValue) {
        this.estimatedDate = 'Already on track!';
      } else {
        this.estimatedDate = 'Not achievable with current trend';
      }

      // Historical values padded with nulls for future
      const historicalData: (number | null)[] = [...values];
      for (let i = 0; i < futureSteps; i++) {
        historicalData.push(null);
      }

      // Downsample if too many points
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

      // Goal line: constant value across all x-axis points
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
          left: '5%',
          right: '5%',
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
