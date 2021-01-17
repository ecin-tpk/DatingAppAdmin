import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services';
import { AlertService } from '../_services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AccountService,
    private alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // Auto logout if 401 or 403 response returned from api
        if ([401, 403].includes(err.status) && this.authService.accountValue) {
          this.authService.logout();
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        // TODO: show alert properly
        // this.alertService.showAlert(error);
        return throwError(error);
      })
    );
  }
}
