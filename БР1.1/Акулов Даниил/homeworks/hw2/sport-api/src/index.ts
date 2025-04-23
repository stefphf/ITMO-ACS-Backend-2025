import express from "express";
import {dataSource} from "./config/dataSource";
import {router} from './routes'
import 'dotenv/config'
import {errorHandler} from "./middleware/errorHandler";

const app = express();

const PORT = process.env.API_PORT || 8000

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });