import {} from "formik";
import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column()
    postId: number;

    @Field(() => Post)
    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
