import {UNIQUE_USERNAME_CONSTRAINT, User} from "../entities/User";
import {AppDataSource} from "../app-dataSource";
import {generateToken} from "../utils/generateToken";
import {TimeEnum} from "../utils/TimeEnum";
import * as bcrypt from 'bcrypt'
import {Hobby} from "../entities/Hobby";
import {In} from 'typeorm'
import {refreshTokens} from "../app";


function objectResult(status: number, message: string) {
    return {status: status, message: message}
}


class UserService {

    private userRepository = AppDataSource.getRepository(User)

    async register(username: string, password: string, hobbies: string[]): Promise<{status: number, message: string | object}> {

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User()
        user.username = username
        user.password = password


        const userHobbies = await AppDataSource.getRepository(Hobby).findAndCountBy({name: In(hobbies)})

        console.log(userHobbies)

        if (userHobbies[1] !== hobbies.length)
            return {status:422, message: 'Choose hobbies that are in the list'}


        user.hobbies = userHobbies[0]

        // const validated = await validateParameters(user)
        //
        // if(validated.length)
        //     return {status: 422, message: validated}
            //    throw new Error('SOMETHING IS WRONG')

        try {
            user.password = hashedPassword
            // await AppDataSource.getRepository(User).save(user)
            await this.userRepository.save(user)
        } catch(err: any) {

            if(err?.constraint === UNIQUE_USERNAME_CONSTRAINT)
                return objectResult(422, 'Username in use!')

            return objectResult(500, 'Something went wrong')
        }


        return objectResult(200, 'Your account has been created successfully!')

    }


    async login(username: string, password: string) {

        try {

            // const user = await AppDataSource
            //     .getRepository(User)
            //     .createQueryBuilder('user')
            //     .where('user.username=:username and user.password=:password', {username: userUsername, password: userPassword})
            //     .getOne()

            // const user = await AppDataSource
            //     .getRepository(User)
            //     .findOneBy({username})

            const user = await this.userRepository.findOneBy({username})

            let isPasswordMatched: boolean = false
            if(user?.password) {
                isPasswordMatched = await bcrypt.compare(password, user.password)
            }

            if (user?.uuid && isPasswordMatched === true) {
                const token = generateToken(user.uuid, TimeEnum.MINUTE)
                const refreshToken = generateToken(user.uuid, TimeEnum.DAY)
                refreshTokens.push(refreshToken)
                return {status: 200, message: 'You have logged in successfully!', token: token, refreshToken: refreshToken}
            }
            return {status: 422, message: 'Wrong credentials!', token: '', refreshToken: ''}
        } catch(err) {
            return {status: 500, message: 'Something went wrong', token: '', refreshToken: ''}
        }
    }

    async getUserData(uuid: string) {

        try {
            // const user = await AppDataSource.getRepository(User).findOne({
            //     select: {
            //         username: true,
            //         uuid: true,
            //         role: true,
            //         date_created: true
            //     },
            //     where: {
            //         uuid
            //     }
            // })

            const user = await this.userRepository.createQueryBuilder('user')
                .select('user.uuid')
                .addSelect('user.username')
                .innerJoinAndSelect('user.hobbies', 'hobbies')
                .where('user.uuid=:uuid', {uuid})
                .getOne()


            // const user = await this.userRepository.findOne({
            //     relations: {
            //         hobbies: true
            //     },
            //     select: {
            //         username: true,
            //         uuid: true,
            //         role: true,
            //         date_created: true
            //     },
            //     where: {
            //         uuid
            //     }
            // })

            // const user = await AppDataSource.getRepository(User).findOneBy({uuid})

            return {status: 200, message: user}

        } catch(err) {
            console.log(err)
            return objectResult(500, 'Something went wrong')
        }

    }
}

export default new UserService()