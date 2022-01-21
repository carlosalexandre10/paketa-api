import { container } from 'tsyringe';

import ItemRepository from '@modules/infra/typeorm/repositories/ItemRepository';
import IItemRepository from '@modules/repositories/IItemRepository';

container.registerSingleton<IItemRepository>('ItemRepository', ItemRepository);
