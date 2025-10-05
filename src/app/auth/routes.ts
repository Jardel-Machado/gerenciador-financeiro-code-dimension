import { Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/auth/components/layout/layout.component';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
];
