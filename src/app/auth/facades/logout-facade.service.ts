import { AuthTokenStorageService } from 'src/app/auth/services/auth-token-storage.service';
import { inject, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import ts from 'typescript';
import { tap } from 'rxjs';
import { LoggedInUserStoreService } from 'src/app/auth/stores/logged-in-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {
  private readonly authService = inject(AuthService);
  private readonly authTokenStorageService = inject(AuthTokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);
  logout(){
    return this.authService.logout().pipe(
      tap(() => this.authTokenStorageService.removeToken()),
      tap(() => this.loggedInUserStoreService.logout())
    )
  }
}
