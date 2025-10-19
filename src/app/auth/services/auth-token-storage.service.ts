import { LocalStorageToken } from './../tokens/local-storage-token';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {
  private readonly key = 'auth-token';

  private readonly localStorageToken = inject(LocalStorageToken);

  saveToken(token: string): void {
    this.localStorageToken.setItem(this.key, token);
  }

  getToken(): string | null {
    return this.localStorageToken.getItem(this.key);
  }

  hasToken(): boolean {
    return Boolean(this.getToken());
  }

  removeToken(): void {
    return this.localStorageToken.removeItem(this.key);
  }
}
