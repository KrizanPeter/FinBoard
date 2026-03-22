import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnalyticsTileDto } from "src/app/_models/analytics/analyticsTileDto";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getTiles() {
        return this.http.get<AnalyticsTileDto[]>(this.baseUrl + 'Analytics/getAll');
    }

    reorderTiles(reorderList: { sourceId: string, sourceType: number, orderIndex: number }[]) {
        return this.http.put(this.baseUrl + 'Analytics/reorder', reorderList);
    }
}
