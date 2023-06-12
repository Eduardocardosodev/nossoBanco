import { prismaClient } from '../database/prismaClient';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/UserDTO';
import { User } from '../entities/User';
import { EmailExists } from '../errors/EmailExists';
import { UserNotFound } from '../errors/UserNotFound';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  private mapUserDTOToUser(userDTO: UserDTO): User {
    const { id, name, email, password, cpf, dateOfBirth } = userDTO;

    return new User(id!, name!, email!, password!, cpf!, dateOfBirth!);
  }
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<User[]> {
    const userNotFound = await this.userRepository.getUsers();

    if (userNotFound.length === 0) {
      throw new UserNotFound();
    }

    return userNotFound.map((userDTO) => this.mapUserDTOToUser(userDTO));
  }

  public async getById(id: number): Promise<User | null> {
    const userDTO = await this.userRepository.getById(id);

    if (!userDTO) {
      throw new UserNotFound();
    }
    return this.mapUserDTOToUser(userDTO);
  }

  public async getByCpf(cpf: string): Promise<User | null> {
    const userNotFound = await this.userRepository.getByCpf(cpf);

    if (!userNotFound) {
      throw new UserNotFound();
    }
    return this.mapUserDTOToUser(userNotFound);
  }

  public async createUser(userDTO: CreateUserDTO): Promise<User> {
    const { email } = userDTO;

    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new EmailExists();
    }

    const newUserDTO = await this.userRepository.createUser(userDTO);

    return this.mapUserDTOToUser(newUserDTO);
  }

  public async updateUser(
    id: number,
    userDTO: UpdateUserDTO
  ): Promise<User | null> {
    const userNotFound = await this.userRepository.getById(id);

    if (!userNotFound) {
      throw new UserNotFound();
    }

    const updatedUserDTO = await this.userRepository.updateUser(id, userDTO);

    return this.mapUserDTOToUser(updatedUserDTO!);
  }

  public async deleteUser(id: number): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
