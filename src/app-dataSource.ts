import {DataSource} from "typeorm"
import {dbVariables} from './configs/database-config'

export const AppDataSource = new DataSource(dbVariables)