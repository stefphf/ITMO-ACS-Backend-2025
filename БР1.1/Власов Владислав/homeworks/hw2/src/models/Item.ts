import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Effect } from "./Effect";

enum ItemType {
    Weapon = "weapon",
    Armor = "armor",
    Equipment = "equipment"
}

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({
        type: 'enum',
        enum: ItemType
    })
    type: ItemType

    @Column()
    cost: number

    @Column()
    weight: number

    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]
}