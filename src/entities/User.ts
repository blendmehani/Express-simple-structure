import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Unique, ManyToMany, JoinColumn, JoinTable
} from 'typeorm'
import {IsString, IsUppercase, Matches, MaxLength, MinLength} from 'class-validator'
import {Hobby} from "./Hobby";

export enum UserRole {
    ADMIN= 1,
    EDITOR = 2,
    SIMPLE = 3
}

export const UNIQUE_USERNAME_CONSTRAINT = 'unique_username_constraint'

@Entity()
@Unique(UNIQUE_USERNAME_CONSTRAINT, ['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "uuid",
        generated: "uuid"
    })
    uuid: string

    @Column({
        length: 50,
    })
    username: string

    @Column()
    password: string

    // role can be admin, simple user, editor
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.SIMPLE
    })
    role: UserRole

    @ManyToMany((type)=> Hobby, (hobby) => hobby.users)
    @JoinTable()
    hobbies: Hobby[]


    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_updated: Date

    @DeleteDateColumn()
    date_deleted: Date

}