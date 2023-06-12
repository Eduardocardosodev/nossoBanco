import { Router } from 'express';
import { UserService } from './services/UserService';
import UserController from './Controllers/UserController';
import { AccountService } from './services/AccountService';
import AccountController from './Controllers/AccountController';
import { AuthMiddleware } from './middlewares/auth';
import { TransactionController } from './Controllers/TransactionController';
import { TransactionService } from './services/TransactionService';
import { UserRepository } from './repositories/UserRepository';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const accountService = new AccountService();

const transactionService = new TransactionService(accountService);

const userController = new UserController(userService, accountService);
const accountController = new AccountController(accountService);
const transactionController = new TransactionController(transactionService);

const routes = Router();

routes.get('/users', AuthMiddleware(userService), userController.index);
routes.get('/users/:id', AuthMiddleware(userService), userController.show);
routes.post('/users', userController.create);
routes.get('/login', userController.login);

routes.put('/users/:id', AuthMiddleware(userService), userController.update);
routes.delete('/users/:id', AuthMiddleware(userService), userController.delete);

routes.get('/accounts', AuthMiddleware(userService), accountController.index);

routes.post(
  '/transactions/send',
  AuthMiddleware(userService),
  transactionController.createTransaction
);
routes.get(
  '/transactions',
  AuthMiddleware(userService),
  transactionController.index
);

export default routes;
