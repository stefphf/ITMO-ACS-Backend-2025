import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Effect } from "./Effect"

enum ConditionType {
    Triggering = "triggering",
    Effect = "effect",
    Ending = "ending"
}

enum TargetType {
    Target = "target",
    Self = "self",
}

@Entity()
export class Condition {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: ConditionType,
    })
    type: ConditionType

    @Column({
        type: 'enum',
        enum: TargetType,
    })
    targetType: TargetType

    @Column()
    parameter: string

    @Column()
    operand: string

    @Column()
    value: string

    @ManyToOne(() => Effect, effect => effect.conditions)
    effect: Effect
}