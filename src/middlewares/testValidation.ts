import {NextFunction, Request, RequestHandler, Response} from "express";
import {CreateUserDto} from "../dto/CreateUserDto";
import {plainToInstance} from 'class-transformer'
import {validate, ValidationError} from 'class-validator'
import {sanitize} from 'class-sanitizer'
// const testValidation = (Dto) => {
//     return (req:Request, res: Response, next: NextFunction) => {
//
//         const bodyData = req.body
//         const instance = new CreateUserDto()
//
//         bodyData.forEach()
//     }
// }


// const testValidation = (dto: any): RequestHandler => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//
//         const dtoObject = plainToInstance(dto, req.body)
//
//         sanitize(dtoObject)
//
//         const validated = await validate(dtoObject)
//
//         let validationErrors = []
//
//         validated.forEach(error => {
//             let property = error.property
//             validationErrors.push({[property]: error.constraints})
//         })
//
//         if(validated.length)
//             return res.status(422).json({errors: validationErrors})
//
//
//         console.log(dtoObject)
//         req.body = dtoObject
//         next()
//
//     }
//
// }






const testValidation = (dto: any): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const dtoObject = plainToInstance(dto, req.body)

        sanitize(dtoObject)

        const validated = await validate(dtoObject)

        let errorParams: { [x: string]: { [type: string]: string; } | undefined; }[] = []

        validated.forEach(error => {
            let property = error.property
            errorParams.push({[property]: error.constraints})
        })

        if(validated.length)
            return res.status(422).json({errors: errorParams})

        req.body = dtoObject
        return next()

    }
}

export default testValidation