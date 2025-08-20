import { Routes } from '@angular/router';
import { CreateComponent } from 'src/app/home/pages/create/create.component';
import { Home } from 'src/app/home/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];
