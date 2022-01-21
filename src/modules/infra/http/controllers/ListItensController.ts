import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListItensService from '@modules/services/ListItensService';

export default class ListItensController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listItensService = container.resolve(ListItensService);

    const itens = await listItensService.execute();

    return response.status(200).json(itens);
  }
}
