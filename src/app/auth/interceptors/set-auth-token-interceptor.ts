import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenStorageService } from 'src/app/auth/services/auth-token-storage.service';
import { LoggedInUserStoreService } from 'src/app/auth/stores/logged-in-user-store.service';

export const setAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loggedInUserStoreService = inject(LoggedInUserStoreService);

  if (!loggedInUserStoreService.isLoggedIn()) {
    return next(req);
  }

  const authTokenStorageService = inject(AuthTokenStorageService);

  const token = authTokenStorageService.getToken();

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(newReq);
};
