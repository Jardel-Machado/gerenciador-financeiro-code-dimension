import { TransactionType } from "src/app/shared/transaction/enums/transaction-type";

export interface Transaction {
  title: string;
  type: TransactionType;
  value: number;
}
