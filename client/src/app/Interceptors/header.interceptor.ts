import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { RegisterUserDto } from '../_models/userModels/userRegisterResponse';
   
  export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const userData = JSON.parse(localStorage.getItem('userData'));   
      console.log(userData);
      if(userData == null)
        return next.handle(req);
      const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer '+userData.token) });
      return next.handle(clonedRequest);
      // Pass the cloned request instead of the original request to the next handle
    }
  }