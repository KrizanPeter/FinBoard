import { Injectable } from '@angular/core';
import { CanActivate, Route, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService : AuthService, private toastr: ToastrService, private router: Router){

  }

  canActivate(): Observable<boolean>{
    return this.accountService.user.pipe(
      map(user=>{
        if(user) return true;
        this.toastr.error("You are not authorized");
        this.router.navigate(["/login"])
      })
    )
  }
  
}
