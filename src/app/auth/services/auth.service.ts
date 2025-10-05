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
      return of({ token: 'fake-jwt-token' });
    }
    return throwError(
      () => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })
    );
  }

  logout(): void {
    // Implement logout logic if needed
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      id: 1,
      username: 'admin'
    });
  }
}
