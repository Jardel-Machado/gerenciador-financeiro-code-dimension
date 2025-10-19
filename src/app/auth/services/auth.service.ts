import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthTokenResponse } from 'src/app/auth/interfaces/auth-token-response';
import { User } from 'src/app/auth/interfaces/user';
import { UserCredentials } from 'src/app/auth/interfaces/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(payload: UserCredentials): Observable<AuthTokenResponse> {
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: this.generateJwtToken() });
    }
    return throwError(
      () => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })
    );
  }

  logout() {
    return of({});
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      id: 1,
      username: 'admin',
    });
  }

  refreshToken(token: string) {
    return of({ token: this.generateJwtToken() });
  }

  private generateJwtToken(): string {
    let token = '';
    const possibleChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
      token += possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length)
      );
    }

    return token;
  }
}
