import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from 'src/app/layout/components/header/header';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {}
