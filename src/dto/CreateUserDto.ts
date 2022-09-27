import {MinLength, MaxLength, IsString, IsNotEmpty, Matches} from 'class-validator'
import {Ltrim, Rtrim, Trim} from 'class-sanitizer'

export class CreateUserDto {


    @IsString()
    @MinLength(5, {
        message: 'Minimum length of username should be $constraint1, but it is $value'
    })
    @MaxLength(10, {
        message: 'Maximum length of username should be $constraint1, but it is $value'
    })
    @Ltrim()
    @Rtrim()
    @Trim()
    @IsNotEmpty()
    username: string

    @Matches(RegExp('^[A-Za-z]{5,10}$'), {
        message: 'Password must contain 5 to 10 characters'
    })
    @Trim()
    @IsNotEmpty()
    password: string


}