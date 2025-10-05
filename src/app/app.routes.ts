import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from 'src/app/auth/guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./layout/pages/layout').then((c) => c.Layout),
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/routes').then((c) => c.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then((c) => c.routes),
  },
];
