export interface FinancialGoalDto {
    financialGoalId: string;
    accountId: string;
    resourceId: string | null;
    resourceGroupId: string | null;
    targetName: string;
    targetValue: number;
    currentValue: number;
    percentageFulfilled: number;
    dueDate: string;
    remainingDays: number;
}
