import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../auth/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService :UserService, private router : Router) {}

  intercept(
Request<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
  
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 ) {
          localStorage.removeItem('username'); 
          this.authService.setAuthenticated(false); 
          localStorage.removeItem('token'); 
          this.router.navigate(['/signin']); 
        }
        return throwError(error);
      })
    );
    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
