import { Express, Request, Response } from 'express';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getMetadataArgsStorage } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export const useSwagger = (app: Express, options: any) => {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  }) as Record<string, any>;

  const spec = routingControllersToSpec(getMetadataArgsStorage(), options, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API documentation for Auth Service',
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT || 8001}`,
        description: 'Local development server',
      },
    ],
  });

  app.get('/api-docs/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(spec);
  });

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
