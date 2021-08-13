import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @OneToMany(() => Event, (event) => event.creator)
    events: Event[];

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ default: "https://avatars.githubusercontent.com/u/57936?v=4" })
    imgUrl!: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
