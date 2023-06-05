import { User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { CreateUserDTO, UpdateUserDTO } from '../dto/UserDTO';
import { EmailExists } from '../errors/EmailExists';
import { UserNotFound } from '../errors/UserNotFound';

export class UserService {
  public async getUsers(): Promise<User[]> {
    const userNotFound = await prismaClient.user.findMany();

    if (userNotFound.length === 0) {
      throw new UserNotFound();
    }

    return await prismaClient.user.findMany();
  }

  public async getById(id: number): Promise<User | null> {
    const userNotFound = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userNotFound) {
      throw new UserNotFound();
    }
    return userNotFound;
  }

  public async getByCpf(cpf: string): Promise<User | null> {
    const userNotFound = await prismaClient.user.findFirst({
      where: { cpf },
    });

    if (!userNotFound) {
      throw new UserNotFound();
    }
    return userNotFound;
  }

  public async createUser(userDTO: CreateUserDTO): Promise<User> {
    const { email } = userDTO;

    const existingUser = await prismaClient.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new EmailExists();
    }

    const newUser = await prismaClient.user.create({
      data: {
        ...userDTO,
        dateOfBirth: userDTO.dateOfBirth.toISOString(),
      },
    });

    return newUser;
  }

  public async updateUser(
    id: number,
    userDTO: UpdateUserDTO
  ): Promise<User | null> {
    const userNotFound = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userNotFound) {
      throw new UserNotFound();
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        ...userDTO,
        dateOfBirth: userDTO.dateOfBirth?.toISOString(),
      },
    });

    return updatedUser;
  }

  public async deleteUser(id: number): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
