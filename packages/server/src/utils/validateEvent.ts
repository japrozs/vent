import { EventInput } from "src/resolvers/EventInput";

export const validateEvent = (options: EventInput) => {
    if (options.name.length <= 2) {
        return [
            {
                field: "name",
                message: "Name must be greater than 2",
            },
        ];
    }

    if (options.name.trim().length == 0) {
        return [
            {
                field: "name",
                message: "Name cannot be empty",
            },
        ];
    }

    if (options.tagLine.length <= 2) {
        return [
            {
                field: "tagLine",
                message: "Tagline must be greater than 2",
            },
        ];
    }

    if (options.tagLine.trim().length == 0) {
        return [
            {
                field: "name",
                message: "Name cannot be empty",
            },
        ];
    }

    return null;
};
