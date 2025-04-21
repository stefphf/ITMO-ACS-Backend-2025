import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Character } from "./Character";

@Entity()
export class CharacterDescription {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    background: string

    @Column()
    description: string

    @Column()
    gender: string

    @Column()
    age: string

    @Column()
    height: number

    @Column()
    notes: string
}
