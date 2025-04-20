import { DataSource } from "typeorm";
import config from "./config/ormconfig";

const PostgresDataSource = new DataSource(config);

export default PostgresDataSource;
