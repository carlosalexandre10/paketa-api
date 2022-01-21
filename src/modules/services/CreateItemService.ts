import { inject, injectable } from 'tsyringe';

import ICreateItemDTO from '@modules/dtos/ICreateItemDTO';
import Item from '@modules/infra/typeorm/entities/Item';
import IItemRepository from '@modules/repositories/IItemRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateItemService {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository,
  ) {}

  public async execute({ name, relatedId }: ICreateItemDTO): Promise<Item> {
    const checkItemExist = await this.itemRepository.findByName(name);

    if (checkItemExist) {
      throw new AppError('Item já existe');
    }

    const item = await this.itemRepository.create({
      name,
      relatedId,
    });

    return item;
  }
}

export default CreateItemService;
