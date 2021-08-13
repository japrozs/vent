import { Field, InputType } from "type-graphql";

@InputType()
export class EventInput {
    @Field()
    name: string;

    @Field()
    tagLine: string;

    @Field()
    description: string;
}
