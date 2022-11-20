import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private router: Router, private toastr: ToastrService, private authService: AuthService)
    {}

    intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if(error){
                    switch(error.status){
                        case 400:
                            if(error.error.errors){
                                const modalStateErrors=[];
                                for(const key in error.error.errors){
                                    modalStateErrors.push(error.error.errors[key])
                                }
                                throw modalStateErrors;
                            } else{
                                this.toastr.error(error.error)
                            }
                            break;
                        case 401:
                            this.toastr.error("Sorry your session timed out");
                            this.authService.logout();
                            this.router.navigate(['/login']);
                            break;
                        case 404:
                            this.toastr.error(error.error)
                            break;
                        case 500:
                            const navigationextras: NavigationExtras = {state: {error: error.error}};
                            this.router.navigateByUrl('/server-error', navigationextras);
                            break;
                        default:
                            this.toastr.error("Something goes really wrong");
                            console.log(error);
                            break;
                    }
                }
                return throwError(error);
            })
        );
    }
}