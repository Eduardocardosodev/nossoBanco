export class InvalidToken extends Error {
  constructor() {
    super('Token inválido.');
    this.name = 'InvalidToken';
  }
}
