import { Router } from 'express';
import { body, param } from 'express-validator';

import ensureValidaCampos from '@shared/infra/http/middlewares/ensureValidaCampos';

import CreateItemController from '../controllers/CreateItemController';
import DeleteItemController from '../controllers/DeleteItemController';
import ListItensController from '../controllers/ListItensController';

const itemRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Itens
 *   description: Rotas - Itens
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Item:
 *        type: object
 *        properties:
 *          id:
 *            type: uuid
 *            description: ID do Item - NotNull.
 *          name:
 *            type: string
 *            description: Nome do Item - NotNull.
 *          relatedId:
 *            type: string
 *            description: item do submenu - NotNull.
 *          submenus:
 *            type: string[]
 *            description: submenu - NotNull.
 *        example:
 *          id: 4a6e006e-12f4-496b-9e26-c96a753c88c9
 *          name: Eletrônicos
 *          relatedId: 4a6e006e-12f4-496b-9e26-c96a753c88c9
 *          submenus: [item1, item2, item3]
 */

/**
 * @swagger
 * /api/v1/menu:
 *   post:
 *     tags: [Itens]
 *     summary: Inclui um Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nome do Item - NotNull.
 *                  example: Eletrônicos
 *                relatedId:
 *                  type: string
 *                  description: item do submenu - NotNull.
 *                  example: 4a6e006e-12f4-496b-9e26-c96a753c88c9
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
const createItemController = new CreateItemController();
itemRouter.post(
  '/',
  [
    body('name')
      .isString()
      .withMessage('O parâmetro "name" é obrigatório e deve ser uma string'),
    body('relatedId')
      .isUUID()
      .optional()
      .withMessage('O parâmetro "relatedId" deve ser um UUID válido'),
  ],
  ensureValidaCampos,
  createItemController.handle,
);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   delete:
 *     tags: [Itens]
 *     summary: Exclui um Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Item.
 *         schema:
 *           type: uuid
 *     responses:
 *       204:
 *         description: Item excluído
 */
const deleteItemController = new DeleteItemController();
itemRouter.delete(
  '/:id',
  [
    param('id')
      .isUUID()
      .withMessage('O parâmetro "id" é obrigatório e deve ser um UUID válido'),
  ],
  ensureValidaCampos,
  deleteItemController.handle,
);

/**
 * @swagger
 * /api/v1/menu:
 *   get:
 *     tags: [Itens]
 *     summary: Lista de Itens.
 *     description: Retorna uma lista dos Itens.
 *     responses:
 *       200:
 *         description: Itens listados.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Item'
 */
const listItensController = new ListItensController();
itemRouter.get('/', listItensController.handle);

export default itemRouter;
