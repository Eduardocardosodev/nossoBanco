export class TransactionNotFound extends Error {
  constructor() {
    super('Transacão não encontrada.');
    this.name = 'TransactionNotFound';
  }
}
