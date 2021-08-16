import { Event } from "../entities/Event";
import { isAuth } from "../middleware/isAuth";
import { validateEvent } from "../utils/validateEvent";
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
import { Context } from "../types";
import { EventInput } from "./EventInput";
import { FieldError } from "./user";
import { Post } from "../entities/Post";

@ObjectType()
class EventResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Event, { nullable: true })
    event?: Event;
}

@Resolver()
export class EventResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => EventResponse)
    async createEvent(
        @Arg("options") options: EventInput,
        @Ctx() { req }: Context
    ) {
        const errors = validateEvent(options);
        if (errors) {
            return { errors };
        }

        const event = await Event.create({
            ...options,
            creatorId: req.session.userId,
        }).save();

        return { event };
    }

    @UseMiddleware(isAuth)
    @Query(() => Event, { nullable: true })
    async getEvent(@Arg("id", () => Int) id: number) {
        return Event.findOne({ where: { id }, relations: ["creator"] });
    }

    @UseMiddleware(isAuth)
    @Query(() => [Event])
    async getAllEvents() {
        return Event.find({
            order: { createdAt: "DESC" },
            relations: ["creator"],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => [Post], { nullable: true })
    async getEventPosts(@Arg("id", () => Int) id: number) {
        return Post.find({
            where: { eventId: id },
            order: { createdAt: "DESC" },
            relations: ["event", "creator"],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => [Event], { nullable: true })
    async getUserEvents(@Arg("id", () => Int!) id: number) {
        return Event.find({
            where: { creatorId: id },
            order: { createdAt: "DESC" },
        });
    }
}
