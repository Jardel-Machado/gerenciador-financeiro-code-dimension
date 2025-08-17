import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardType } from 'src/app/home/components/types/card.type';
import { ValueCssClassType } from 'src/app/home/components/types/value-css-class.type';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
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
    return this.value() > 0 ? 'income' : 'outcome';
  });
}
