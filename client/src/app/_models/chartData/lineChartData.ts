export class LineChartData{
    legend :string[] = [];
    xAxisLabels: string[] = [];
    data : LineRawData[] = [];

}

export class LineRawData{
    name: string;
    type: 'line';
    label: {};
    data: number[];


    constructor(name:string, data: number[]){
        this.name = name;
        this.data = data;
        this.type = 'line';
        this.label = {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#ffffff',
              },
            },
          }
    }
}