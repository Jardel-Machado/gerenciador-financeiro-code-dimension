import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Balance } from 'src/app/home/components/balance/balance';
import { TransactionItem } from '../../components/transaction-item/transaction-item';
import { NoTransactions } from 'src/app/home/components/no-transactions/no-transactions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionService } from 'src/app/shared/transaction/services/transaction';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  transactions = signal<Transaction[]>([]);

  private readonly transactionService = inject(TransactionService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.transactions.set(response);
        },
        error: (error) => {
          console.error('Error fetching transactions:', error);
        },
      });
  }
}
