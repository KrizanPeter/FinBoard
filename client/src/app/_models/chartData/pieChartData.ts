export class PieChartData{
    legend: string[];
    data: PieRawData[] = [];

    constructor(){
    }
}

export class PieRawData{
    name:string;
    value:number;
    
    constructor(name: string, value: number){
        this.name = name;
        this.value = value;
    }
}