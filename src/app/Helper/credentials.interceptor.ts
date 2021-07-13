import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = new URL(request.url, 'http://localhost:4200');
    if (!url.pathname.startsWith('/cropscan/api')) return next.handle(request);
intercepted request', request.url);
    const requestWithCredentials = request.clone({
      withCredentials: true,
    });

    return next.handle(requestWithCredentials);
  }
}

