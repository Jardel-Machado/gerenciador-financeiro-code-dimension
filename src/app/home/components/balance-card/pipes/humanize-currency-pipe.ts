import { formatCurrency } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, inject, Pipe, PipeTransform, LOCALE_ID } from '@angular/core';

const suffixes = ['K', 'M', 'B', 'T'];
@Pipe({
  name: 'humanizeCurrency',
})
export class HumanizeCurrencyPipe implements PipeTransform {
  private readonly currencyCode = inject(DEFAULT_CURRENCY_CODE);
  private readonly localeId = inject(LOCALE_ID);
  transform(value: number): string {
    const formattedValue = formatCurrency(value, this.localeId, this.getCurrencySymbol()!);

    const splittedValue = formattedValue.split('.');

    if (splittedValue.length === 1) {
      return splittedValue[0];
    }

    return this.formatValueWithSuffix(splittedValue);
  }

  private formatValueWithSuffix(splittedValue: string[]): string {
    const suffix = this.getSuffix(splittedValue);

    const [firstValue, secondValue] = splittedValue;

    const firstCharOfSecondValue = secondValue.charAt(0);

    if (firstCharOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    }

    return `${firstValue}.${firstCharOfSecondValue}${suffix}`;
  }

  private getSuffix(splittedValue: string[]): string {
    return suffixes[splittedValue.length - 2];
  }
  
  private getCurrencySymbol() {
    return new Intl.NumberFormat(this.localeId, {
      style: 'currency',
      currency: this.currencyCode,
    }).formatToParts().find(part => part.type === 'currency')?.value;
  }
}
