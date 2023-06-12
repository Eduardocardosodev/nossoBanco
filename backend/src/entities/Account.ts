import { Transaction } from './Transaction';
import { User } from './User';

export type Decimal = number;

export class Account {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }
}
