export interface GrowthPeriodDto {
    label: string;
    growth: number | null;
}

export interface AnalyticsTileDto {
    sourceId: string;
    name: string;
    entityType: string;
    currentValue: number;
    quarterlyGrowth: GrowthPeriodDto[];
    yearlyGrowth: GrowthPeriodDto[];
    orderIndex: number;
}
