import { Account } from './Account';

export class Transaction {
  id: number;
  value: number;
  debitedTransaction: boolean;
  creditedTransaction: boolean;

  constructor(
    id: number,
    value: number,
    debitedTransaction: boolean,
    creditedTransaction: boolean
  ) {
    this.id = id;
    this.value = value;
    this.debitedTransaction = debitedTransaction;
    this.creditedTransaction = creditedTransaction;
  }
}
