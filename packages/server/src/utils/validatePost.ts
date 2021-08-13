import { PostInput } from "src/resolvers/PostInput";

export const validatePost = (options: PostInput) => {
    if (options.title.length <= 2) {
        return [
            {
                field: "title",
                message: "Title must be greater than 2",
            },
        ];
    }

    if (options.body.trim().length == 0) {
        return [
            {
                field: "body",
                message: "Body cannot be empty",
            },
        ];
    }

    return null;
};
