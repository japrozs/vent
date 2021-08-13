import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { PostInput } from "./PostInput";
import { FieldError } from "./user";
import { validatePost } from "../utils/validatePost";

@ObjectType()
class PostResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Post, { nullable: true })
    post?: Post;
}

@Resolver()
export class PostResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => PostResponse, { nullable: true })
    async createPost(
        @Arg("options") options: PostInput,
        @Ctx() { req }: Context
    ) {
        const errors = validatePost(options);
        if (errors) {
            return { errors };
        }

        const post = await Post.create({
            title: options.title,
            body: options.body,
            creatorId: req.session.userId,
            eventId: options.eventId,
        }).save();

        return { post };
    }

    @UseMiddleware(isAuth)
    @Query(() => [Post], { nullable: true })
    async getAllPosts() {
        return Post.find({ order: { createdAt: "DESC" } });
    }

    @UseMiddleware(isAuth)
    @Query(() => Post, { nullable: true })
    async getPost(@Arg("id", () => Int) id: number) {
        return Post.findOne(id);
    }
}
