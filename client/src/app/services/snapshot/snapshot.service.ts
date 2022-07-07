import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SnapshotDto } from "src/app/_models/snapshotModels/snapshotDto";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class SnapshotService{

    reloadTrigger = new BehaviorSubject<string>("");
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){
    }

    getSnapshots(resourceId:string){
        return this.http.get<SnapshotDto[]>(this.baseUrl+'Snapshot/getAll?resourceId='+resourceId);
    }

    deleteSnapshot(snapshotId:string){
        return this.http.delete(this.baseUrl+'Snapshot/delete?snapshotId='+snapshotId);
    }

    createSnapsthot(resourceId: string, date: Date, amount:number){
        date.setHours( date.getHours() + 2 );
        return this.http.post(this.baseUrl+'Snapshot/create', {
            resourceId: resourceId,
            dateOfChange: date.toJSON(),
            amount: amount
        });
    }

    createAggregateSnapsthot(data: SnapshotDto[]){
        data.forEach(element => {
            element.dateOfChange.setHours( element.dateOfChange.getHours() + 2 );
        }); 
        return this.http.post(this.baseUrl+'Snapshot/createAggregate', data);
    }
}