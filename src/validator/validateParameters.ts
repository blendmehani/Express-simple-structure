import {validate} from 'class-validator'


export async function validateParameters(entity: object){

    let validationErrors: { [x: string]: { [type: string]: string } | undefined }[] = []

    const validation = await validate(entity)

    console.log(validation)
    validation.forEach(value => {
        let property = value.property
        validationErrors.push({[property]: value.constraints})
    })

    return validationErrors

}