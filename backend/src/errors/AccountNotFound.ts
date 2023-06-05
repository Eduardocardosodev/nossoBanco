export class AccountNotFound extends Error {
  constructor() {
    super('Conta nao encontrada.');
    this.name = 'AccountNotFound';
  }
}
