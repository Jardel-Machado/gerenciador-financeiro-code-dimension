import { TransactionType } from "src/app/shared/transaction/enums/transaction-type";

export interface Transaction {
  id: number;
  title: string;
  type: TransactionType;
  value: number;
}

export type TransactionRequest = Omit<Transaction, 'id'>;
