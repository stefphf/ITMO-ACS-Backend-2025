import { Express } from 'express';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getMetadataArgsStorage } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ExerciseDto, TargetDto, WeaponTypeDto } from '@app/dto';
import { SchemaObject } from 'openapi3-ts';
import { Request, Response } from 'express';

export const useSwagger = (app: Express, options: any) => {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  }) as Record<string, any>;

  // Явно добавляем схемы
  const additionalSchemas: Record<string, SchemaObject> = {
    ExerciseDto: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        weaponTypeId: { type: 'number' },
        targetId: { type: 'number' },
        description: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: [
        'id',
        'name',
        'weaponTypeId',
        'targetId',
        'createdAt',
        'updatedAt',
      ],
    },
    TargetDto: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string', nullable: true },
        image: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'name', 'createdAt', 'updatedAt'],
    },
    WeaponTypeDto: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'name', 'createdAt', 'updatedAt'],
    },
  };

  const spec = routingControllersToSpec(getMetadataArgsStorage(), options, {
    components: {
      schemas: {
        ...schemas,
        ...additionalSchemas,
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    info: {
      title: 'Reference Service API',
      version: '1.0.0',
      description: 'Документация API для сервиса справочников',
    },
  });

  // Добавляем маршрут для получения swagger.json
  app.get('/api-docs/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(spec);
  });

  // Настройка Swagger UI с явным указанием пути для swagger.json
  app.use(
    '/api-docs/',
    swaggerUi.serve,
    swaggerUi.setup(spec, {
      swaggerOptions: {
        url: '/api-docs/swagger.json',
        persistAuthorization: true,
      },
    }),
  );

  return app;
};
