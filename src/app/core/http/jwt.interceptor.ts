import { Logger } from './../logger.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Constants } from '../constants/constants';

const log = new Logger('JWT Interceptor');
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.indexOf(environment.serverUrl)) {
      const savedCredentials =
        sessionStorage.getItem(Constants.CREDENTIALS_KEY) || localStorage.getItem(Constants.CREDENTIALS_KEY);
      if (savedCredentials) {
        const credentials = JSON.parse(savedCredentials);
        const token = credentials.token;
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token}`
            }
          });
        }
      }
    }
    return next.handle(request);
  }
}
