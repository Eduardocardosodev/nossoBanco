import { prismaClient } from '../database/prismaClient';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/UserDTO';
import { User } from '../entities/User';

export class UserRepository {
  private mapPrismaUserToUserDTO(prismaUser: User): UserDTO {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      cpf: prismaUser.cpf,
      dateOfBirth: prismaUser.dateOfBirth,
    };
  }

  public async getUsers(): Promise<UserDTO[]> {
    const users = await prismaClient.user.findMany({
      orderBy: [{ id: 'desc' }],
    });

    return users.map((prismaUser) => {
      return new User(
        prismaUser.id,
        prismaUser.name,
        prismaUser.email,
        prismaUser.password,
        prismaUser.cpf,
        prismaUser.dateOfBirth
      );
    });
  }

  public async getById(id: number): Promise<UserDTO | null> {
    const prismaUser = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!prismaUser) {
      return null;
    }
    return this.mapPrismaUserToUserDTO(prismaUser);
  }

  public async getByEmail(email: string): Promise<UserDTO | null> {
    const prismaUser = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!prismaUser) {
      return null;
    }
    return this.mapPrismaUserToUserDTO(prismaUser);
  }

  public async getByCpf(cpf: string): Promise<UserDTO | null> {
    const prismaUser = await prismaClient.user.findFirst({
      where: { cpf },
    });

    if (!prismaUser) {
      return null;
    }
    return this.mapPrismaUserToUserDTO(prismaUser);
  }

  public async createUser(userDTO: CreateUserDTO): Promise<UserDTO> {
    const createdUser = await prismaClient.user.create({
      data: userDTO,
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.cpf,
      createdUser.dateOfBirth
    );
  }

  public async updateUser(
    id: number,
    userDTO: UpdateUserDTO
  ): Promise<UpdateUserDTO | null> {
    const prismaUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      return null;
    }

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        ...userDTO,
        dateOfBirth: userDTO.dateOfBirth?.toISOString(),
      },
    });

    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.cpf,
      updatedUser.dateOfBirth
    );
  }

  public async deleteUser(userDTO: UserDTO, id: number): Promise<void | null> {
    const prismaUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      return null;
    }

    const deleteUser = await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
