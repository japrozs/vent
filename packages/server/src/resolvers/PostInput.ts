import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PostInput {
    @Field()
    title: string;

    @Field()
    body: string;

    @Field(() => Int)
    eventId: number;
}
