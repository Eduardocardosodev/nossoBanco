export class UserNotFound extends Error {
  constructor() {
    super('Usuário nao encontrado.');
    this.name = 'UserNotFound';
  }
}
