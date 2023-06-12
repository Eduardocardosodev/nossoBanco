import { User } from '../entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adicione a propriedade 'user' ao objeto Request
    }
  }
}
