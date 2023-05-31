import { User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export class UserService {
  public async getUsers(): Promise<User[]> {
    return prismaClient.user.findMany();
  }

  public async getById(id: number): Promise<User | null> {
    return prismaClient.user.findUnique({
      where: { id },
    });
  }

  public async createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    dateOfBirth: Date
  ): Promise<User> {
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        cpf,
        dateOfBirth: dateOfBirth.toISOString(),
      },
    });

    return newUser;
  }

  public updateUser(
    id: number,
    name: string,
    email: string,
    cpf: string,
    dateOfBirth: Date,
    password: string
  ): Promise<User | null> {
    return prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name,
        cpf,
        dateOfBirth,
        email,
        password,
      },
    });
  }

  public async deleteUser(id: number): Promise<User | null> {
    return prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
