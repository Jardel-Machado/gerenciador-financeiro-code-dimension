import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/shared/transaction/services/transaction';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
  const transactionService = inject(TransactionService);
  return transactionService.getAll();
};
