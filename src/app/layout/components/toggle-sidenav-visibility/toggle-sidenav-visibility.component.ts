import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileLayoutService } from 'src/app/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from 'src/app/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-toggle-sidenav-visibility',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
})
export class ToggleSidenavVisibilityComponent {
  private readonly mobileLayoutService = inject(MobileLayoutService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  isMobile = this.mobileLayoutService.isMobile();

  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle();
  }
}
