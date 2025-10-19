import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoggedInUserStoreService } from 'src/app/auth/stores/logged-in-user-store.service';
import { LogoutDirective } from 'src/app/layout/components/sidenav-items/directives/logout.directive';
import { SidenavVisibilityStore } from 'src/app/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav-items',
  imports: [MatListModule, RouterLink, RouterLinkActive, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  links = signal([{ label: 'Home', url: '/home' }]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  closeSidenav(){
    this.sidenavVisibilityStore.close();
  };
}
