import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { PieChartData } from 'src/app/_models/chartData/pieChartData';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  styleUrls: ['../echarts.component.scss']

})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  @Input() chartData: PieChartData;
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  stateChange() {
    setTimeout(function () {
    }, 5000);
  }

  ngAfterViewInit() {
    this.stateChange();
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: this.chartData.legend,//['USA', 'Germany', 'France', 'Canada', 'Russia'],
        //   textStyle: {
        //     color: echarts.textColor,
        //   },
        // },
        series: [
          {
            //name: 'Countries',
            type: 'pie',
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            radius: [35, 115],
            roseType: 'area',
            data: this.chartData.data
             /*[
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
            ]*/,
            itemStyle: {
              borderRadius: 8,
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
                show: true, position: 'outer',
                formatter : function (params){
                  return  params.name+" "+params.value + ',-\n'
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
