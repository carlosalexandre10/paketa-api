import { inject, injectable } from 'tsyringe';

import IItemRepository from '@modules/repositories/IItemRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteItemService {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkItemExist = await this.itemRepository.findById(id);

    if (!checkItemExist) {
      throw new AppError('Item não existe');
    }

    await this.itemRepository.delete(id);
  }
}

export default DeleteItemService;
