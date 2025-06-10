import 'reflect-metadata';
import express from 'express';
import { useSwagger } from './swagger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserController } from './controllers/UserController';
import { AppDataSource, InitializeDatabase } from './appDataSource';
import { User } from './models/UserModel';


export class App {
    private app: express.Express
    constructor() {
        routingUseContainer(Container);
        InitializeDatabase();
        AppDataSource
            .initialize()
            .then(() => {
                Container.set('user.repository', AppDataSource.getRepository(User));
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })

        const options = {
            controllers: [UserController],
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
        };

        let exprServ = createExpressServer(options);
        exprServ.use(express.json());
        this.app = useSwagger(exprServ, options);
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}
