import * as express from 'express'
import {Express, NextFunction, Request, Response} from 'express'
import router from './routes'
import {json, urlencoded} from './middlewares/bodyParser'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import {generateToken} from "./utils/generateToken";
import {TimeEnum} from "./utils/TimeEnum";
import {Jwt, JwtPayload} from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            data: string
        }
    }
}

export let refreshTokens: string[] | any[] = []

class App {

    public express: Express

    constructor() {
        this.express = express()
        this.loadMiddlewares()
        this.loadRoutes()

    }

    private loadMiddlewares() {
        this.express.use(json)
        this.express.use(urlencoded)
    }

    private loadRoutes() {
        this.express.use(router)

        this.express.post('/token', (req: Request, res: Response, next: NextFunction) => {
            const refreshToken = req.body.token

            if (!refreshToken) {
                return res.status(401).json('Not authorized')
            }

            if(!refreshTokens.includes(refreshToken))
                return res.status(403).json('Forbidden')

            const token: JwtPayload = jwt.verify(refreshToken, process.env.APP_SECRET as string) as JwtPayload

            let accessToken: string = ''
            if (token) {
                accessToken = generateToken(token['uuid'], TimeEnum.MINUTE)
                return res.status(200).json({accessToken})
            }

            return res.status(403).json('Forbidden')

            })

        this.express.use((req: Request, res: Response, next: NextFunction) => {
            return res.status(404).json({message: 'This route does not exist'})
        })

        // AppDataSource.initialize().then(() => {
        //     console.log('Nice')
        // }).catch(() =>
        //     console.log('Not nice')
        // )
    }

}

export default new App().express