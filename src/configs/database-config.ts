import 'dotenv/config'
import {DataSourceOptions} from 'typeorm'
import {User} from "../entities/User";
import {Hobby} from "../entities/Hobby";

const {DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USERNAME} = process.env

export const dbVariables: DataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD as string,
    port: DB_PORT as number | undefined || 5432,
    database: DB_NAME,
    // entities: ["./src/entities/*.ts"],
    entities: [User, Hobby],
    migrations: ['./src/migrations/*.ts'],
    synchronize: true
}


