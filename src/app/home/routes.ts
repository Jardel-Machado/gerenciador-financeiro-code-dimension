import { Routes } from '@angular/router';
import { CreateOrEditComponent } from 'src/app/home/pages/create-or-edit/create-or-edit.component';
import { Home } from 'src/app/home/pages/home/home';
import { getTransactionByIdResolverResolver } from 'src/app/home/resolvers/get-transaction-by-id-resolver-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateOrEditComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    resolve: {
      transaction: getTransactionByIdResolverResolver
    }
  },
];
