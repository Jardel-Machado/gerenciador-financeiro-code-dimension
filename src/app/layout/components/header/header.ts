import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleSidenavVisibilityComponent } from 'src/app/layout/components/toggle-sidenav-visibility/toggle-sidenav-visibility.component';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    ToggleSidenavVisibilityComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
