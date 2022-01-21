import { Router } from 'express';

import itemRouter from '@modules/infra/http/routes/item.routes';

const routes = Router();

routes.use('/api/v1/menu', itemRouter);

export default routes;
