import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataForDaschboardChartsDto } from "src/app/_models/dashboard/dashboardChartsDataDto";
import { DashboardDto } from "src/app/_models/dashboard/dashboardDto";
import { DashboardOverviewDto } from "src/app/_models/dashboard/dashboardOverviewDto";
import { ResourceDto } from "src/app/_models/resourceModels/resourceDto";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class DashboardService{


    reloadTrigger = new BehaviorSubject<boolean>(true);
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){
    }

    getOverviewData(){
        return this.http.get<DashboardOverviewDto[]>(this.baseUrl+'Dashboard/getOverviewData');
    }

    getChartData(dashboardChartId: string) {
        return this.http.get<DataForDaschboardChartsDto>(this.baseUrl+'Dashboard/getData?dashboardChartId='+dashboardChartId);
    }


    createDashboardChart(dashboardDto: DashboardDto){
        return this.http.post(this.baseUrl+'Dashboard/create', dashboardDto);
    }

    getDashboards() {
        return this.http.get<DashboardDto[]>(this.baseUrl+'Dashboard/getAll');
      }

    deleteDashboardChart(dashboardChartId: string){
        return this.http.delete(this.baseUrl+'Dashboard/delete?dashboardChartId='+dashboardChartId);
    }

}