import { computed, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutFacadeService } from 'src/app/auth/facades/logout-facade.service';
import { LoggedInUserStoreService } from 'src/app/auth/stores/logged-in-user-store.service';

@Directive({
  selector: '[appLogout]',
  host: { '(click)': 'logout()' },
})
export class LogoutDirective {
  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);
  logout() {
    this.logoutFacadeService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (error) => console.error('Logout failed', error),
    });
  }
}
