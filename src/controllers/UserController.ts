import {NextFunction, Request, Response} from "express";
import userService from "../services/UserService";
import {validateBody} from "../utils/validateBody";



class UserController {


    async register (req: Request, res: Response, next: NextFunction) {

        const bodyData = req.body

        // console.log(bodyData['username'])

        // return res.status(200).json(req.body)

        const validatedBody = validateBody(req.body, 'username', 'password')

        if(validatedBody.length) {
            return res.status(400).json({error: validatedBody})
        }

        const {username, password, hobbies} = req.body

        // try {
        const result = await userService.register(username, password, hobbies)
        // }
        // catch(err) {
        //     return res.status(500).json({message: 'Something went wrong'})
        // }

        if(result['status'] === 422)
            return res.status(result['status']).json({errors: result.message})

        return res.status(result['status']).json({message: result.message})

    }

    async login (req: Request, res: Response, next: NextFunction) {

        const {username, password} = req.body

        const result = await userService.login(username, password)

        if (result.status === 500)
            return res.status(result.status).json({message: result.message})
        else
            return res.status(result.status).json({message: result.message, token : result.token, refreshToken: result.refreshToken})

    }

    async getUserData (req: Request, res: Response, next: NextFunction) {

        const uuid = req.data

        const result = await userService.getUserData(uuid)

        if (result.message == typeof String) {
            return res.status(result.status).json({message: result.message})}
        else
            return res.status(result.status).json(result.message)
    }
}

export default new UserController()