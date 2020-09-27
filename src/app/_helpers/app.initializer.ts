import { AuthService } from '../_services';

export function appInitializer(accountService: AuthService) {
  return () =>
    new Promise((resolve) => {
      // Attemp to refresh token on app start up to auto authenticate
      accountService.refreshToken().subscribe().add(resolve);
    });
}
