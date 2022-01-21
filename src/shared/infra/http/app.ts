import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/database';
import '@shared/container';

const app = express();

app.use(express.json());

// CORS
app.use(cors());

// SWAGGER
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      definition: {
        components: {},
        openapi: '3.0.0',
        info: {
          title: 'PAKETA - API',
          description: 'API PAKETA',
          contact: {
            name: 'CARLOS ALEXANDRE',
            email: 'carlos11alexandre11@gmail.com',
          },
          version: '1.0.0',
        },
      },
      apis: ['./src/modules/**/routes/*.ts'],
    }),
  ),
);

// ROUTES
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// ERRORS
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export default app;
