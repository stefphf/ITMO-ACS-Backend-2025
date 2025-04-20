import express from "express";
import routes from './routes';
import PostgresDataSource from "./orm/db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use('/', routes);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "RESTful API boilerplate",
    version: "1.0.0",
    description: "Auto-generated swagger docs"
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`
    }
  ]
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.ts", "./src/controllers/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

PostgresDataSource.initialize().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger UI: http://localhost:${port}/api-docs`);
  });
});
