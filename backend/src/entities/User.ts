import { Account } from './Account';

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  dateOfBirth: Date;
  accounts?: Account[];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    cpf: string,
    dateOfBirth: Date,
    accounts?: Account[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.accounts = accounts;
  }
}
