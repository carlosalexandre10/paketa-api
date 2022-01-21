import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/services/CreateItemService';

export default class CreateItemController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, relatedId } = request.body;

    const createItemService = container.resolve(CreateItemService);

    const item = await createItemService.execute({
      name,
      relatedId,
    });

    return response.status(201).json(item);
  }
}
