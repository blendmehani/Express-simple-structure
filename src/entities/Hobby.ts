import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";

@Entity()
export class Hobby {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany((type) => User, (user) => user.hobbies)
    users: User[]
}

