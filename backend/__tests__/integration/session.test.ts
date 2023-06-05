// import request from 'supertest';
// import { app } from '../../src/server';
// import { UserService } from '../../src/services/UserService';
// import { prismaClient } from '../../src/database/prismaClient';
// import * as userService from '../../src/services/UserService';
// import { CreateUserDTO } from '../../src/dto/UserDTO';

// describe('UserController', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//   describe('GET /users', () => {
//     it('should return all users', async () => {
//       const response = await request(app).get('/users');

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('users');
//       // expect(response.body.users).toHaveLength(2); // Adjust the expected length based on your test data
//     });

//     it('should return an empty array when no users are found', async () => {
//       jest.spyOn(UserService.prototype, 'getUsers').mockResolvedValue([]);

//       const response = await request(app).get('/users');

//       expect(response.status).toBe(404);
//       expect(response.body).toEqual({ message: 'Usuario nao encontrado' });
//       // expect(response.body).toHaveProperty('message', 'Usuario nao encontrado');
//     });

//     describe('GET /users/:ID', () => {
//       it('should return a specific user by ID', async () => {
//         const userId = 3;

//         const response = await request(app).get(`/users/${userId}`);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('id', userId);
//         // expect(response.body).toHaveProperty('users');
//         // expect(response.body.users).toHaveLength(2); // Adjust the expected length based on your test data
//       });

//       it('should return 404 Not Found if user ID is not found', async () => {
//         const userId = 456; // ID de um usuário inexistente

//         const response = await request(app).get(`/users/${userId}`);

//         expect(response.status).toBe(404);
//         expect(response.body).toHaveProperty(
//           'message',
//           'Usuário nao encontrado.'
//         );
//       });
//     });

//     describe('POST /users/create', () => {
//       it('should return a created user', async () => {
//         const createUserMock = jest
//           .spyOnProperty(userService as any, 'createUser')
//           .mockImplementation(async (user: any) => {
//             // Validar campos obrigatórios
//             if (
//               !user.name ||
//               !user.email ||
//               !user.password ||
//               !user.cpf ||
//               !user.dateOfBirth
//             ) {
//               throw new Error('Campos obrigatórios não foram fornecidos.');
//             }

//             return {
//               id: 1,
//               name: user.name,
//               email: user.email,
//               password: 'hashedPassword',
//               cpf: user.cpf,
//               dateOfBirth: user.dateOfBirth,
//             };
//           });

//         const newUser = {
//           name: 'John Doe',
//           email: 'john@gmail.com',
//           password: '1234',
//           cpf: '12345678901',
//           dateOfBirth: new Date('2023-01-01'),
//         };

//         const response = await request(app).post('/users').send(newUser);

//         expect(response.status).toBe(201);
//         expect(response.body).toEqual({
//           message: 'Usuário criado com sucesso.',
//         });
//         expect(createUserMock).toHaveBeenCalledWith(newUser);
//       });

//       it('should return a error 500 to create a user', async () => {
//         const newUser = {
//           name: 'John Doe',
//           email: 'john@gmail.com',
//           password: 1234, //pass typeof propertie wrong
//           cpf: '12345678901',
//           dateOfBirth: new Date('2023-01-01'),
//         };

//         const response = await request(app).post('/users').send(newUser);

//         expect(response.status).toBe(500);
//         expect(response.body).toEqual({ message: 'Erro ao criar o usuário ' });
//       });
//     });

//     describe('PUT /users/:ID', () => {
//       it('should return a user updated', async () => {
//         const userId = 3;

//         const newUser = {
//           name: 'John DoeUpdated',
//         };

//         const response = await request(app)
//           .put(`/users/${userId}`)
//           .send(newUser);

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({
//           message: 'Usuário atualizado com sucesso.',
//         });
//       });

//       it('should return a error 404 to update a user to ID', async () => {
//         const userId = 333;

//         const newUser = {
//           name: 'John DoeUpdated',
//         };

//         const response = await request(app)
//           .put(`/users/${userId}`)
//           .send(newUser);

//         expect(response.status).toBe(404);
//         expect(response.body).toEqual({
//           message: 'Usuário nao encontrado.',
//         });
//       });
//     });

//     describe('DELETE /users/delete/:ID', () => {
//       it('should delete a user', async () => {
//         const testUser = await prismaClient.user.create({
//           data: {
//             name: 'Test User',
//             email: 'test@example.com',
//             password: 'password',
//             cpf: '123456789',
//             dateOfBirth: new Date(),
//           },
//         });

//         const userId = testUser.id;

//         const response = await request(app).delete(`/users/${userId}`);

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({
//           message: 'Usuário deletado com sucesso.',
//         });
//       });

//       it('should not delete a user with ID wrong', async () => {
//         const userId = 444;

//         const response = await request(app).delete(`/users/${userId}`);

//         expect(response.status).toBe(404);
//         expect(response.body).toEqual({
//           message: 'Usuário nao encontrado.',
//         });
//       });
//     });
//   });
// });

// describe('accountController', () => {
//   describe('GET /accounts', () => {
//     it('should get all accounts', async () => {
//       const response = await request(app).get('/accounts');

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('accounts');
//     });
//   });
// });
