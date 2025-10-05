import { computed, Injectable, signal } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserStoreService {
  private readonly state = signal<User | null>(null);

  currentUser = computed(() => this.state());

  isLoggedIn = computed(() => this.state() !== null);
  setUser(user: User): void {
    this.state.set(user);
  }

  logout(): void {
    this.state.set(null);
  }
}
