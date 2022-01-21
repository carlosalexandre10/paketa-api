import { getRepository, Repository } from 'typeorm';

import ICreateItemDTO from '@modules/dtos/ICreateItemDTO';
import IItemRepository from '@modules/repositories/IItemRepository';

import Item from '../entities/Item';

class ItemRepository implements IItemRepository {
  private ormRepostiry: Repository<Item>;

  constructor() {
    this.ormRepostiry = getRepository(Item);
  }

  public async findById(id: string): Promise<Item | undefined> {
    const item = await this.ormRepostiry.findOne(id);

    return item;
  }

  public async findByName(name: string): Promise<Item | undefined> {
    const item = await this.ormRepostiry.findOne({ where: { name } });

    return item;
  }

  public async findAll(): Promise<Item[]> {
    const itens = await this.ormRepostiry.find();

    return itens;
  }

  public async create({ name, relatedId }: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepostiry.create({ name, relatedId });

    await this.ormRepostiry.save(item);

    return item;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepostiry.delete(id);
  }
}

export default ItemRepository;
