import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TransactionType } from 'src/app/shared/transaction/enums/transaction-type';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';

const CSS_CLASSES = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
}
@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  templateUrl: './transaction-value.html',
  styleUrl: './transaction-value.scss',
  host: { '[class]': 'cssClass()' },
})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cssClass = computed(() => CSS_CLASSES[this.transaction().type]);
}
