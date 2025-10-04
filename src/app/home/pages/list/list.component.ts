import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { Balance } from 'src/app/home/components/balance/balance';
import { NoTransactions } from 'src/app/home/components/no-transactions/no-transactions';
import { TransactionItem } from 'src/app/home/components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from 'src/app/home/components/transactions-container/transactions-container.component';
import { ConfirmationDialogService } from 'src/app/shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from 'src/app/shared/feedback/services/feedback.service';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionService } from 'src/app/shared/transaction/services/transaction';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  transactions = signal<Transaction[]>([]);

  private readonly transactionService = inject(TransactionService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly feedbackService = inject(FeedbackService);
  private readonly confirmationDialogService = inject(
    ConfirmationDialogService
  );

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

  edit(transaction: Transaction) {
    this.router.navigate(['home/edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: 'Você gostaria de deletar essa transação?',
      })
      .subscribe({
        next: () => {
          this.transactionService
            .delete(transaction.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.removeTransactionFromArray(transaction);
                this.feedbackService.success('Transação removida com sucesso!');
              },
              error: (error) => {
                console.error('Error deleting transaction:', error);
              },
            });
        },
        error: (error) => {
          console.error('Error in dialog:', error);
        },
      });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id)
    );
  }
}
