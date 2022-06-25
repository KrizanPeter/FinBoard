import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, tap } from "rxjs";
import { AuthenticatedUser } from "src/app/_models/userModels/authenticatedUser";
import { RegisterUserDto } from "src/app/_models/userModels/userRegisterResponse";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class AuthService{
    baseUrl = environment.apiUrl;
    user = new Subject<AuthenticatedUser>();
    constructor(private http: HttpClient){

    }

    register(nick: string, userName:string, password: string){
        return this.http.post<RegisterUserDto>(this.baseUrl+'Auth/register', {
            nick: nick,
            userName: userName,
            password: password
        }).pipe(
            tap( resData =>{
                const user = new AuthenticatedUser("", resData.userName, resData.token, resData.id, resData.accountId)

            }
            )
        )
    }
}