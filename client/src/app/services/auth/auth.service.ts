import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { AuthenticatedUser } from "src/app/_models/userModels/authenticatedUser";
import { RegisterUserDto } from "src/app/_models/userModels/userRegisterResponse";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class AuthService{

    baseUrl = environment.apiUrl;
    user = new BehaviorSubject<AuthenticatedUser>(null);
    constructor(private http: HttpClient, private router: Router){

    }

    register(userName: string, email:string, password: string){
        return this.http.post<RegisterUserDto>(this.baseUrl+'Auth/register', {
            userName: userName,
            email: email,
            password: password
        }).pipe(
            tap( resData =>{
                const currentUser = new AuthenticatedUser(resData.userName, resData.email, resData.token, resData.id, resData.accountId);
                this.user.next(currentUser);
                localStorage.setItem('userData', JSON.stringify(currentUser))
            })
        )
    }

    login(email:string, password: string){
        return this.http.post<RegisterUserDto>(this.baseUrl+'Auth/login', {
            userName: "",
            email: email,
            password: password
        }).pipe(
            tap( resData =>{
                const currentUser = new AuthenticatedUser(resData.userName, resData.email, resData.token, resData.id, resData.accountId);
                this.user.next(currentUser);
                localStorage.setItem('userData', JSON.stringify(currentUser))
            })
        )
    }

    autologin(){
        const userData :{
            userName:string,
            email:string,
            token:string,
            id:string,
            accountId:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const authUser = new AuthenticatedUser(userData.userName, userData.email, userData.token, userData.id, userData.accountId);
        this.user.next(authUser);
    }

    logout() {
        this.user.next(null);
    }
}