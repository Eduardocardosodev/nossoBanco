import { UserService } from '../services/UserService';
import { AccountService } from '../services/AccountService';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { EmailExists } from '../errors/EmailExists';
import { UserNotFound } from '../errors/UserNotFound';
import { InvalidPassword } from '../errors/InvalidPassword';
import JWT from 'jsonwebtoken';
import jwt from '../config/auth';

class UserController {
  private userService: UserService;
  private accountService: AccountService;

  constructor(userService: UserService, accountService: AccountService) {
    this.userService = userService;
    this.accountService = accountService;
    this.index = this.index.bind(this); // Bind do método 'index' ao contexto da classe
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.login = this.login.bind(this);
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();

      res.status(200).json({ users });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar os usuários' });
      }
    }
  }

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.getById(Number(id));

      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ message: 'Erro ao listar o usuário ' });
      }
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, password, cpf, dateOfBirth, email } = req.body;

      const parsedDateOfBirth = new Date(dateOfBirth);

      const password_hash = await bcryptjs.hash(password, 10);

      const user = await this.userService.createUser({
        name,
        email,
        password: password_hash,
        cpf,
        dateOfBirth: parsedDateOfBirth,
      });

      await this.accountService.createAccount({
        balance: 100.0,
        user_id: user.id!,
      });

      res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error: any) {
      if (error instanceof EmailExists) {
        res.status(409).json({ error: error.message });
      } else {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
      }
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, password } = req.body;

      const user = await this.userService.getByCpf(cpf);

      if (!user) {
        throw new UserNotFound(); // Lança um erro personalizado se o usuário não for encontrado
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new InvalidPassword(); // Lança um erro personalizado se a senha for inválida
      }

      const token = JWT.sign({ userId: user?.id }, jwt.jwt.secret, {
        expiresIn: jwt.jwt.expiresIn, // Defina a expiração do token como desejar
      });

      res.status(200).json({ user, token });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidPassword) {
        res.status(422).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao atualizar o usuário ' });
      }
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const { name, password, cpf, dateOfBirth, email } = req.body;

      const user = await this.userService.getById(Number(id));

      await this.userService.updateUser(Number(id), {
        name,
        email,
        cpf,
        dateOfBirth,
      });

      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao atualizar o usuário ' });
      }
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.getById(Number(id));

      if (!user) {
        throw new UserNotFound();
      }

      await this.userService.deleteUser(Number(id));

      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao atualizar o usuário ' });
      }
    }
  }
}

export default UserController;
