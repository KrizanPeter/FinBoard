import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { baseAccountDataDto } from "src/app/_models/accountModels/baseAccountDataDto";
import { AuthenticatedUser } from "src/app/_models/userModels/authenticatedUser";
import { RegisterUserDto } from "src/app/_models/userModels/userRegisterResponse";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class AccountService{
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient){

    }

    getBaseData(){
        return this.http.get<baseAccountDataDto>(this.baseUrl+'Account/getBaseData');
    }

    setBaseData(baseData: baseAccountDataDto) {
        return this.http.put<baseAccountDataDto>(this.baseUrl+'Account/setBaseData', baseData);
    }
   
}