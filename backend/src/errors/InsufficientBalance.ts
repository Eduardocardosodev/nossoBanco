export class InsufficientBalance extends Error {
  constructor() {
    super('Saldo insuficiente na conta de origem.');
    this.name = 'InsufficientBalance';
  }
}
