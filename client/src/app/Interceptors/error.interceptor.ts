import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private router: Router, private toastr: ToastrService)
    {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                console.log("Error")
                console.log(error)
                if(error){
                    console.log("som error")
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
                            this.toastr.error(error.error)
                        case 404:
                            this.toastr.error(error.error)
                        case 500:
                            const navigationextras: NavigationExtras = {state: {error: error.error}};
                            this.router.navigateByUrl('/server-error', navigationextras);
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