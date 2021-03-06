import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from '../_services';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add auth header with jwt if user is logged in and request is to the api url
    const user = this.authService.accountValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl =
      request.url.startsWith(environment.apiUrl) ||
      request.url.startsWith('http://192.168.0.108:5000');
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
