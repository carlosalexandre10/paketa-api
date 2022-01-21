import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteItemService from '@modules/services/DeleteItemService';

export default class DeleteItemController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteItemService = container.resolve(DeleteItemService);

    await deleteItemService.execute(id);

    return response.status(204).send();
  }
}
