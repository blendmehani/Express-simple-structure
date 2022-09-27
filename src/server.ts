import 'dotenv/config'
import app from './app'
import {AppDataSource} from './app-dataSource'
const SERVER_PORT = process.env['SERVER_PORT']

app.listen(SERVER_PORT, async () => {
    try {
        await AppDataSource.initialize()
        console.info('Connected to database successfully!')
    } catch(err) {
        console.error('Not connected to database!')
    }
    console.info(`Server is running in port: ${SERVER_PORT}`)

})