import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import auth from '../config/auth';
import { UserNotFound } from '../errors/UserNotFound';
import { InvalidToken } from '../errors/InvalidToken';

export const AuthMiddleware =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new InvalidToken();
      }

      const [, token] = authorization.split(' ');
      const decoded = verify(token, auth.jwt.secret) as { cpf: string };

      const { cpf } = decoded;

      const user = await userService.getByCpf(cpf);

      if (!user) {
        throw new UserNotFound();
      }

      req.user = user;

      next();
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidToken) {
        return res.status(401).json({ error: error.message });
      } else {
        console.log(error.message);
      }
    }
  };
