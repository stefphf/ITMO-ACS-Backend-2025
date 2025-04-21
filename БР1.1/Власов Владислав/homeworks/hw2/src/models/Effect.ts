import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Condition } from "./Condition"

@Entity()
export class Effect {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    isPassive: boolean

    @Column()
    isTemp: boolean

    @Column({
        default: 0
    })
    ActionTime: number

    @OneToMany(() => Condition, condition => condition.effect)
    conditions: Condition[]
}