import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from 'src/app/home/components/balance-card/pipes/humanize-currency-pipe';
import { CardType } from 'src/app/home/components/types/card.type';
import { ValueCssClassType } from 'src/app/home/components/types/value-css-class.type';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizeCurrencyPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClassType>(() => {
    if (this.type() === 'income') {
      return 'income';
    }
    if (this.type() === 'outcome') {
      return 'outcome';
    }
    if (this.value() === 0) {
      return 'zero';
    }
    return this.value() > 0 ? 'income' : 'outcome';
  });
}
