import { DataSource } from "typeorm"
import {createDatabase} from "typeorm-extension";

const dotenv = require('dotenv')

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"],
    synchronize: true,
    logging: true,
})

export async function InitializeDatabase() {
  await createDatabase({ 
    options: AppDataSource.options,
    ifNotExist: true
  });
  console.log('Database connection established');
}
