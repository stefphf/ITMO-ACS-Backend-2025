import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
import { CharacterDescription } from './CharacterDescription';
import { SkillToCharacter } from './SkillToCharacter';
import { Roll } from "./Roll";
import { Race } from "./Race";
import { Edge } from "./Edge";
import { ItemToCharacter } from "./ItemToCharacter";
import { EffectToCharacter } from "./EffectToCharacter";

enum CharacterRank {
    NOVICE = 'novice',
    SEASONER = 'seasoner',
    VETERAN = 'veteran',
    HEROIC = 'heroic',
    LEGEND = "legend",
}

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.characters)
    player: User

    @CreateDateColumn()
    createDate: Date

    @Column()
    name: string

    @Column()
    weight: number

    // Характеристики:
    
    // Ловкость
    @Column()
    agility: number

    // Смекалка
    @Column()
    smarts: number
    
    // Характер
    @Column()
    spirit: number

    // Сила
    @Column()
    strenght: number

    // Выносливость
    @Column()
    vigor: number

    // Саб статы:

    // Шаг
    @Column()
    pace: number

    // Кость бега
    @Column()
    run: number

    // Защита
    @Column()
    parry: number

    // Стойкость
    @Column()
    toughness: number

    // Броня
    @Column()
    armor: number

    // Хиты (обычно 3 или 1)
    @Column()
    hp: number

    // Раны
    @Column()
    wounds: number

    // Усталость
    @Column()
    fatigue: number

    // Состояния:

    @Column()
    isShaken: boolean

    @Column()
    isDead: boolean

    // Прочее

    @Column()
    maxWeight: number

    @Column()
    isWildCard: boolean

    @Column()
    wildDice: number

    @Column()
    advance: number

    @Column({
        type: "enum",
        enum: CharacterRank,
        default: CharacterRank.NOVICE,
    })
    rank: CharacterRank

    // Пользовательские настройки

    @Column()
    isVisible: boolean

    // Арт пока не предусмотрен

    // Связи:

    @OneToOne(() => CharacterDescription)
    @JoinColumn()
    description: CharacterDescription

    @ManyToOne(() => Race)
    race: Race

    @OneToMany(() => Roll, roll => roll.character)
    rolls: Roll[]
    
    @ManyToMany(() => Edge)
    @JoinTable()
    edges: Edge[]

    @OneToMany(() => SkillToCharacter, skill => skill.character)
    skills: SkillToCharacter[]

    @OneToMany(() => ItemToCharacter, item => item.character)
    items: ItemToCharacter[]

    @OneToMany(() => EffectToCharacter, effect => effect.character)
    effects: EffectToCharacter[]
}