import { inject, injectable } from 'tsyringe';

import Item from '@modules/infra/typeorm/entities/Item';
import IItemRepository from '@modules/repositories/IItemRepository';

@injectable()
class ListItensService {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository,
  ) {}

  public async execute(): Promise<Item[]> {
    const itens = await this.itemRepository.findAll();

    return itens;
  }
}

export default ListItensService;
