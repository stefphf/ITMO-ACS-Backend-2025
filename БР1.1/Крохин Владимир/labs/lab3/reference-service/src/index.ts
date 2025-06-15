import 'reflect-metadata';
import { useContainer, useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { Container } from 'typedi';
import express from 'express';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUiExpress from 'swagger-ui-express';
import dataSource from './config/data-source';
import { ReferenceController } from './controllers/reference.controller';

useContainer(Container);

const app = express();
app.use(express.json());

const controllers = [ReferenceController];

useExpressServer(app, {
  controllers,
  routePrefix: '/api',
});

const spec = routingControllersToSpec(getMetadataArgsStorage());

app.use('/api-docs/reference', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
}

startServer();
