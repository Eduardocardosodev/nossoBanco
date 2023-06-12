export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  dateOfBirth: Date;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  dateOfBirth?: Date;
}

export interface UserDTO {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  dateOfBirth?: Date;
}
