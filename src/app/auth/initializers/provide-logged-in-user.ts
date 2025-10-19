import { inject, provideAppInitializer } from "@angular/core";
import { of } from 'rxjs';
import { LoginFacadeService } from 'src/app/auth/facades/login-facade.service';
import { AuthTokenStorageService } from "src/app/auth/services/auth-token-storage.service";

export function provideLoggedInUser() {
  return provideAppInitializer(() => {
    const authTokenStorageService = inject(AuthTokenStorageService);

    if (!authTokenStorageService.hasToken()) {
      return of();
    }

    const loginFacadeService = inject(LoginFacadeService);

    const token = authTokenStorageService.getToken() as string;

    return loginFacadeService.refreshToken(token);
  });
}
