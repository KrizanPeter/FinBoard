export class DashboardDto{
    dashboardChartId: string;
    sourceId: string;
    accountId: string;
    chartName: string;
    chartType: ChartType;
    sourceType: SourceType;
    orderIndex: number;
}

export enum SourceType{
    Resource,
    ResourceGroup,
}

export enum ChartType{
    Bar,
    Line,
    Pie,
}
