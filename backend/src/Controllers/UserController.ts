import { PrismaClient } from '@prisma/client';
import { UserService } from '../services/UserService';
import { Request, Response } from 'express';

class UserController {
  private userService = new UserService();

  constructor(userService: UserService) {
    this.userService = userService;
    this.index = this.index.bind(this); // Bind do método 'index' ao contexto da classe
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os usuários' });
    }
  }

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.getById(Number(id));

      if (!user) {
        res.status(404).json({ message: 'Usuário nao encontrado.' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar o usuário ' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, password, cpf, dateOfBirth, email } = req.body;

      const parsedDateOfBirth = new Date(dateOfBirth);

      const user = await this.userService.createUser(
        name,
        email,
        password,
        cpf,
        parsedDateOfBirth
      );

      res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error: 'Erro ao criar o usuário ' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const { name, password, cpf, dateOfBirth, email } = req.body;

      const parsedDateOfBirth = new Date(dateOfBirth);

      const user = await this.userService.updateUser(
        Number(id),
        name,
        email,
        password,
        cpf,
        dateOfBirth
      );

      res.status(201).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error: 'Erro ao atualizar o usuário ' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.deleteUser(Number(id));

      res.status(201).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error: 'Erro ao deletar o usuário ' });
    }
  }
}

export default UserController;
