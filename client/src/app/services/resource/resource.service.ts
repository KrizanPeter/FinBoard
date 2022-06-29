import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ResourceDto } from "src/app/_models/userModels/resourceDto";
import { RegisterUserDto } from "src/app/_models/userModels/userRegisterResponse";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class ResourceService{

    reloadTrigger = new BehaviorSubject<boolean>(true);
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){
    }

    getResources(){
        return this.http.get<ResourceDto[]>(this.baseUrl+'Resource/getAll');
    }

    deleteResource(resourceId:string){
        return this.http.delete(this.baseUrl+'Resource/delete?resourceId='+resourceId);
    }

    createResource(name: string, currency:number){
        return this.http.post(this.baseUrl+'Resource/create', {
            name: name,
            currency: currency,
        });
    }
}