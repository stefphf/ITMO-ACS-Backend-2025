import 'reflect-metadata';
import express from 'express';
import { useSwagger } from './swagger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { InitializeDatabase } from './appDataSource';
import { Rent } from './models/RentModel';
import { Property } from './models/PropertyModel';
import { PropertyController } from './controllers/PropertyController';
import { RentController } from './controllers/RentController';

export class App {
    private app: express.Express

    constructor() {
        routingUseContainer(Container);
        this.setupDatabase();

        const options = {
            controllers: [RentController, PropertyController],
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
        };

        let exprServ = createExpressServer(options);
        exprServ.use(express.json());
        this.app = useSwagger(exprServ, options);
    }

    private async setupDatabase() {
        try {
            const AppDataSource = await InitializeDatabase();

            const dbName = await AppDataSource.query("SELECT current_database()");
            console.log("1. Current DB:", dbName);

            console.log("2. Entities:", 
            AppDataSource.entityMetadatas.map(e => e.name));
            
            Container.set('rent.repository', AppDataSource.getRepository(Rent));
            Container.set('property.repository', AppDataSource.getRepository(Property));
            console.log("Data Source has been initialized!");
        } catch (error) {
            console.error("Error during initialization:", error);
            process.exit(1); 
        }
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}
