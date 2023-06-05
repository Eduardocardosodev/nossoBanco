export class EmailExists extends Error {
  constructor() {
    super('O e-mail fornecido já está em uso');
    this.name = 'EmailExists';
  }
}
