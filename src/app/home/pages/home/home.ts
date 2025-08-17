import { Component, signal } from '@angular/core';
import { Balance } from 'src/app/home/components/balance/balance';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionItem } from '../../components/transaction-item/transaction-item';
import { TransactionType } from 'src/app/shared/transaction/enums/transaction-type';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([
    { title: 'Salário', value: 100, type: TransactionType.INCOME },
    { title: 'Freelance', value: 50, type: TransactionType.INCOME },
    { title: 'Aluguel', value: 50, type: TransactionType.OUTCOME },
    { title: 'Conta de Luz', value: 100, type: TransactionType.OUTCOME },
  ]);
}
