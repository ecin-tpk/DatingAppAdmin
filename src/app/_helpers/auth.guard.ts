import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AccountService } from '../_services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.accountValue;
    if (user) {
      // Check if route is restricted by role
      if (route.data.roles && !route.data.roles.includes(user.role)) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
