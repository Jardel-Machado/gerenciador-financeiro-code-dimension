import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from 'src/app/layout/components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from 'src/app/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from 'src/app/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly mobileLayoutService = inject(MobileLayoutService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  isMobile = this.mobileLayoutService.isMobile();

  sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  isSidenavOpened = computed(() => {
    if (!this.isMobile()) {
      return true;
    }

    return this.sidenavVisibilityStore.isVisible();
  });
}
