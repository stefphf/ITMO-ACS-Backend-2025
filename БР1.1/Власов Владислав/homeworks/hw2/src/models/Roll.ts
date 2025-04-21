import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
import { Character } from "./Character";
import { Effect } from "./Effect";


@Entity()
export class Roll {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    diceResult: number

    @Column()
    WildDiceResult: number

    @Column()
    ability: string

    @ManyToOne(() => User, user => user.messages)
    author: User

    @ManyToOne(() => Character, character => character.rolls)
    character: Character

    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]
}