import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/shared/transaction/services/transaction';

export const getTransactionByIdResolverResolver: ResolveFn<Transaction> = (route, state) => {
  const transactionService = inject(TransactionService);

  const id = route.paramMap.get('id') as string;

  return transactionService.getById(Number(id));
};
