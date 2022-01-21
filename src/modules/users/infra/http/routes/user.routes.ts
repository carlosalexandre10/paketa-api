import { Router } from 'express';
import { body } from 'express-validator';

import UserController from '@modules/users/infra/http/controllers/UserController';
import ensureValidaCampos from '@shared/infra/http/middlewares/ensureValidaCampos';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas - Users
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: uuid
 *            description: ID do Usuário - NotNull.
 *          name:
 *            type: string
 *            description: Nome do Usuário - NotNull.
 *          email:
 *            type: string
 *            description: E-mail do Usuário - NotNull.
 *          password:
 *            type: string
 *            description: Senha do Usuário - NotNull.
 *        example:
 *          id: 4a6e006e-12f4-496b-9e26-c96a753c88c9
 *          name: Carlos
 *          email: carlos@gmail.com
 *          senha: carlos123
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Inclui um Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nome do Usuário - NotNull.
 *                  example: Carlos
 *                email:
 *                  type: string
 *                  description: E-mail do Usuário - NotNull.
 *                  example: carlos@gmail.com
 *                password:
 *                  type: string
 *                  description: Senha do Usuário - NotNull.
 *                  example: carlos123
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
const userController = new UserController();
userRouter.post(
  '/',
  [
    body('name')
      .isString()
      .withMessage('O parâmetro "name" é obrigatório e deve ser uma string'),
    body('email')
      .isString()
      .withMessage('O parâmetro "email" é obrigatório e deve ser uma string'),
    body('password')
      .isString()
      .withMessage(
        'O parâmetro "password" é obrigatório e deve ser uma string',
      ),
  ],
  ensureValidaCampos,
  userController.handle,
);

export default userRouter;
