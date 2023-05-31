import { Router } from 'express';
import { UserService } from './services/UserService';
import UserController from './Controllers/UserController';

const userService = new UserService();

const userController = new UserController(userService);

const routes = Router();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users/create', userController.create);
routes.put('/users/update/:id', userController.update);
routes.delete('/users/delete/:id', userController.delete);

export default routes;
