import {Request} from "express"


export function validateBody(reqBody: Request, ...data: string[]) {
    let missingParams: string[] = []

    for (let i = 0; i<data.length; i++) {
        // @ts-ignore
        if(!reqBody[data[i]]) {
            missingParams.push(`'${data[i]}' parameter is required`)
        }
    }
    return missingParams
}