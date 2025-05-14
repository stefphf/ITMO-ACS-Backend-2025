import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { UserHandler } from './handlers/UserHandler';
import { AppDataSource } from './appDataSource';
import { RentHandler } from './handlers/RentHandler';
import { PropertyHandler } from './handlers/PropertyHandler';
import { MessageHandler } from './handlers/MessageHandler';

export class App {
    private readonly app: express.Application

    constructor() {
        AppDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
        this.app = express()
        this.app.use(express.json());
        this.initHandlers()
    }

    private initHandlers() {

        useExpressServer(this.app, {
            controllers: [
                UserHandler, 
                // PropertyHandler, 
                // RentHandler, 
                // MessageHandler],
            ]
        })
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}
