import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import AppError from '@shared/errors/AppError';

export default function ensureValidaCampos(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new AppError(`${errors.array()[0].msg}`);
  }

  return next();
}
