import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/verifyToken";
import {JwtPayload} from "jsonwebtoken";


export const checkAuth = (req:Request, res:Response, next: NextFunction) => {

    try {

        let token: string = ''

        if(req.headers.authorization)
            token = req.headers.authorization.split(' ')[1]

        console.log(token)

        const data: JwtPayload = verifyToken(token) as JwtPayload

        console.log(data)
        if (data) {
            req.data = data['uuid']
        }

        return next()


    } catch(err) {
        return res.status(401).json({message: 'Not authorized'})
    }



}