import { LoggedInUserStoreService } from './../stores/logged-in-user-store.service';
import { AuthTokenStorageService } from 'src/app/auth/services/auth-token-storage.service';
import { inject, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserCredentials } from 'src/app/auth/interfaces/user-credentials';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthTokenResponse } from 'src/app/auth/interfaces/auth-token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {
  private readonly authService = inject(AuthService);
  private readonly authTokenStorageService = inject(AuthTokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  login(userCredentials: UserCredentials){
    return this.authService.login(userCredentials).pipe(this.createUserSession());
  }

  refreshToken(token: string){
    return this.authService.refreshToken(token).pipe(this.createUserSession());
  }

  private createUserSession(){
    return pipe(
      tap((response: AuthTokenResponse) => this.authTokenStorageService.saveToken(response.token)),
      switchMap((response) => this.authService.getCurrentUser(response.token)),
      tap((user) => this.loggedInUserStoreService.setUser(user))
    )
  }
}
