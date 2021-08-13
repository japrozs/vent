import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    eventId: number;

    @ManyToOne(() => Event, (event) => event.posts)
    event: Event;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
