import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LineChartData } from 'src/app/_models/chartData/lineChartData';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
    styleUrls: ['../echarts.component.scss']
})
export class EchartsLineComponent implements AfterViewInit, OnDestroy {
  @Input() chartData : LineChartData;
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      const maxPoints = 10;
      const totalPoints = this.chartData.xAxisLabels.length;

      let xLabels = this.chartData.xAxisLabels;
      let seriesData = this.chartData.data;

      if (totalPoints > maxPoints) {
        const indices: number[] = [];
        for (let i = 0; i < maxPoints; i++) {
          indices.push(Math.round(i * (totalPoints - 1) / (maxPoints - 1)));
        }
        xLabels = indices.map(i => this.chartData.xAxisLabels[i]);
        seriesData = this.chartData.data.map(s => ({
          ...s,
          data: indices.map(i => s.data[i]),
        }));
      }

      const trendColors = seriesData.map(s => {
        const values = s.data;
        if (values.length >= 2) {
          return values[values.length - 1] >= values[values.length - 2] ? '#00d68f' : '#ff3d71';
        }
        return '#00d68f';
      });

      seriesData = seriesData.map((s, i) => ({
        ...s,
        itemStyle: { color: trendColors[i] },
        lineStyle: { color: trendColors[i] },
        areaStyle: { color: trendColors[i], opacity: 0.15 },
      }));

      this.options = {
        backgroundColor: echarts.bg,
        color: trendColors,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: this.chartData.legend,
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: xLabels,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        series: seriesData,
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
