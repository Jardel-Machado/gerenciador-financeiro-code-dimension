import { Routes } from '@angular/router';
import { CreateOrEditComponent } from 'src/app/home/pages/create-or-edit/create-or-edit.component';
import { ListComponent } from 'src/app/home/pages/list/list.component';
import { getTransactionByIdResolverResolver } from 'src/app/home/resolvers/get-transaction-by-id-resolver-resolver';
import { getTransactionsResolver } from 'src/app/home/resolvers/get-transactions-resolver';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
  {
    path: 'create',
    component: CreateOrEditComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    resolve: {
      transaction: getTransactionByIdResolverResolver,
    },
  },
];
