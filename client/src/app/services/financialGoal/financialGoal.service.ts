import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { FinancialGoalDto } from "src/app/_models/financialGoalModels/financialGoalDto";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class FinancialGoalService {
    reloadTrigger = new BehaviorSubject<boolean>(true);
    editGoal = new Subject<FinancialGoalDto | null>();
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getGoals() {
        return this.http.get<FinancialGoalDto[]>(this.baseUrl + 'FinancialGoal/getAll');
    }

    createGoal(resourceId: string | null, resourceGroupId: string | null, targetValue: number, dueDate: string) {
        return this.http.post(this.baseUrl + 'FinancialGoal/create', {
            resourceId: resourceId,
            resourceGroupId: resourceGroupId,
            targetValue: targetValue,
            dueDate: dueDate,
        });
    }

    updateGoal(financialGoalId: string, resourceId: string | null, resourceGroupId: string | null, targetValue: number, dueDate: string) {
        return this.http.put(this.baseUrl + 'FinancialGoal/update', {
            financialGoalId: financialGoalId,
            resourceId: resourceId,
            resourceGroupId: resourceGroupId,
            targetValue: targetValue,
            dueDate: dueDate,
        });
    }

    deleteGoal(financialGoalId: string) {
        return this.http.delete(this.baseUrl + 'FinancialGoal/delete?financialGoalId=' + financialGoalId);
    }
}
