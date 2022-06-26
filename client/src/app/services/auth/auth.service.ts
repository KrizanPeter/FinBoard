import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { AuthenticatedUser } from "src/app/_models/userModels/authenticatedUser";
import { RegisterUserDto } from "src/app/_models/userModels/userRegisterResponse";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class AuthService{

    baseUrl = environment.apiUrl;
    user = new BehaviorSubject<AuthenticatedUser>(null);
    constructor(private http: HttpClient){

    }

    register(nick: string, userName:string, password: string){
        return this.http.post<RegisterUserDto>(this.baseUrl+'Auth/register', {
            nick: nick,
            userName: userName,
            password: password
        }).pipe(
            tap( resData =>{
                const currentUser = new AuthenticatedUser("", resData.userName, resData.token, resData.id, resData.accountId);
                this.user.next(currentUser);
                console.log("storujem user data");
                console.log(currentUser);
                localStorage.setItem('userData', JSON.stringify(currentUser))
            })
        )
    }

    login(userName:string, password: string){
        return this.http.post<RegisterUserDto>(this.baseUrl+'Auth/login', {
            nick: "",
            userName: userName,
            password: password
        }).pipe(
            tap( resData =>{
                const currentUser = new AuthenticatedUser("", resData.userName, resData.token, resData.id, resData.accountId);
                this.user.next(currentUser);
                localStorage.setItem('userData', JSON.stringify(currentUser))
            })
        )
    }

    autologin(){
        const userData :{
            nick:string,
            userName:string,
            token:string,
            id:string,
            accountId:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        console.log("vytahujem usera");
        console.log(userData);
        const authUser = new AuthenticatedUser(userData.nick, userData.userName, userData.token, userData.id, userData.accountId);
        this.user.next(authUser);
    }

    logout() {
        console.log('logout hitted');
        this.user.next(null);
    }
}