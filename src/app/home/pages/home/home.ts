import { Component, signal } from '@angular/core';
import { Balance } from 'src/app/home/components/balance/balance';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionItem } from '../../components/transaction-item/transaction-item';
import { NoTransactions } from 'src/app/home/components/no-transactions/no-transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([

  ]);
}
