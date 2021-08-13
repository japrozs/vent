import { GetAllEventsQuery, GetAllUsersQuery } from "../generated/graphql";

type cardType = "event" | "user";

export interface SearchResult {
    id: number;
    type: cardType;
    name: string;
    imgUrl: string;
    tagLine?: string;
}

export const search = (
    query: string,
    events: GetAllEventsQuery | undefined,
    users: GetAllUsersQuery | undefined
): SearchResult[] => {
    let retVal: SearchResult[] = [];
    const eventArr = events?.getAllEvents.filter((event) =>
        event.name.trim().toLowerCase().includes(query.trim().toLowerCase())
    );

    const usersArr = users?.getAllUsers?.filter((user) =>
        user.username.trim().toLowerCase().includes(query.trim().toLowerCase())
    );

    eventArr?.forEach((event) => {
        retVal.push({
            type: "event",
            id: event.id,
            imgUrl: event.imgUrl,
            name: event.name,
            tagLine: event.tagLine,
        });
    });

    usersArr?.forEach((user) => {
        retVal.push({
            imgUrl: user.imgUrl,
            id: user.id,
            type: "user",
            name: user.username,
        });
    });

    return retVal;
};
