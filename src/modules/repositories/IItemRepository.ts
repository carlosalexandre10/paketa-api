import ICreateItemDTO from '@modules/dtos/ICreateItemDTO';
import Item from '@modules/infra/typeorm/entities/Item';

export default interface IItemRepository {
  findById(id: string): Promise<Item | undefined>;
  findByName(name: string): Promise<Item | undefined>;
  findAll(): Promise<Item[]>;
  create(data: ICreateItemDTO): Promise<Item>;
  delete(id: string): Promise<void>;
}
