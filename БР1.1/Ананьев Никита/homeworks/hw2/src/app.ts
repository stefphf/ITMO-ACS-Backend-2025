import express, { Request, Response } from 'express';
import { User } from './models/UserModel';
import { UserHandler } from './handlers/UserHandlers';
import { UserService } from './services/UserService';
import { AppDataSource } from './appDataSource';

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
        const userService = new UserService(AppDataSource.getRepository(User))
        const userHandler = new UserHandler(userService)
        this.app.use("/users", userHandler.router)
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}
