import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DashboardDto } from "src/app/_models/dashboard/dashboardDto";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class DashboardService{


    reloadTrigger = new BehaviorSubject<boolean>(true);
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){
    }

    createDashboardChart(dashboardDto: DashboardDto){
        return this.http.post(this.baseUrl+'Dashboard/create', dashboardDto);
    }

    getDashboards() {
        return this.http.get<DashboardDto[]>(this.baseUrl+'Dashboard/getAll');
      }

}