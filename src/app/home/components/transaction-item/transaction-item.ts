import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from 'src/app/shared/transaction/interfaces/transaction';
import { TransactionValue } from "../transaction-value/transaction-value";
import { CustomColorDirective } from 'src/app/shared/material/buttons/directives/custom-color.directive';
import { IsIncomeDirective } from 'src/app/home/components/transaction-item/directives/is-income.directive';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    TransactionValue,
    CustomColorDirective,
    IsIncomeDirective,
    MatChipsModule,

  ],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();
  edit = output<Transaction>();
  remove = output<Transaction>();
}
