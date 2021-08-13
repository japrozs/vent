import { Comment } from "../entities/Comment";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@Resolver()
export class CommentResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Comment, { nullable: true })
    async createComment(
        @Arg("id", () => Int!) id: number,
        @Arg("comment", () => String!) comment: string,
        @Ctx() { req }: Context
    ) {
        return Comment.create({
            creatorId: req.session.userId,
            postId: id,
            body: comment,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => [Comment], { nullable: true })
    async getPostComments(@Arg("id", () => Int!) id: number) {
        return Comment.find({
            where: { postId: id },
            order: { createdAt: "DESC" },
        });
    }
}
