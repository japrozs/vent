import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useGetUserQuery } from "../generated/graphql";
import { timeSince } from "../utils/timeSince";
import { colors, globalStyles } from "./theme";

interface CommentProps {
    comment: {
        __typename?: "Comment" | undefined;
        id: number;
        creatorId: number;
        body: string;
        createdAt: string;
    };
    isLast: boolean;
}

export const Comment: React.FC<CommentProps> = ({ comment, isLast }) => {
    const { data, loading } = useGetUserQuery({
        variables: {
            id: comment.creatorId,
        },
    });
    return (
        <View
            style={[
                {
                    marginVertical: 10,
                },
                ,
                isLast ? { marginBottom: 40 } : {},
            ]}
        >
            <View style={[globalStyles.flex, styles.comment]}>
                <Image
                    style={styles.img}
                    source={{ uri: data?.getUser?.imgUrl }}
                />
                <View
                    style={[
                        globalStyles.flex,
                        { marginLeft: 15, alignItems: "center" },
                    ]}
                >
                    <Text style={styles.username}>
                        {data?.getUser?.username}
                        {"   "}
                    </Text>
                    <Text style={styles.time}>
                        {timeSince(
                            new Date(parseInt(comment.createdAt)).toString()
                        )}
                    </Text>
                </View>
            </View>
            <Text style={[styles.commentStyles]}>{comment.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    comment: {
        alignItems: "center",
    },
    img: {
        width: 30,
        height: 30,
        borderColor: colors.lightGray,
        borderRadius: 999,
        borderWidth: 0.5,
    },
    username: {
        fontSize: 18,
        fontWeight: "500",
    },
    time: {
        marginTop: 4,
        color: colors.gray,
    },
    commentStyles: {
        fontSize: 17,
        marginVertical: 2,
    },
});
