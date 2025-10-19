import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from 'src/app/layout/components/header/header';
import { SidenavComponent } from 'src/app/layout/components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, SidenavComponent],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {}
