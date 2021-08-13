import { useApolloClient } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { emptyIcon } from "../../../constants";
import {
    useCreateCommentMutation,
    useGetPostCommentsQuery,
    useGetPostQuery,
    useGetUserQuery,
    useMeQuery,
} from "../../../generated/graphql";
import { Card } from "../../../ui/Card";
import { Comment } from "../../../ui/Comment";
import { colors, globalStyles, layout } from "../../../ui/theme";
import { timeSince } from "../../../utils/timeSince";
import { SearchStackNav } from "../SearchNav";

interface PostProps {}

export const Post: React.FC<SearchStackNav<"Post">> = ({ route }) => {
    const [comment, setComment] = useState("");
    const [createComment] = useCreateCommentMutation();
    const apolloClient = useApolloClient();

    const { data, loading } = useGetPostQuery({
        variables: {
            id: route.params.postId,
        },
    });

    const { data: userData, loading: fetching } = useGetUserQuery({
        variables: {
            id: data?.getPost?.creatorId as number,
        },
    });

    const { data: commentsData, loading: commentsFetching } =
        useGetPostCommentsQuery({
            variables: {
                id: data?.getPost?.id as number,
            },
        });

    const { data: meData } = useMeQuery();

    const handleSubmit = async () => {
        if (comment.trim().length == 0) {
            return;
        }
        await createComment({
            variables: {
                id: data?.getPost?.id as number,
                comment: comment,
            },
        });

        apolloClient.resetStore();
        setComment("");
    };

    return (
        <View style={{ height: "100%" }}>
            <ScrollView style={styles.card}>
                <View style={globalStyles.flex}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: userData
                                ? userData.getUser?.imgUrl
                                : emptyIcon,
                        }}
                    />
                    <Text style={styles.username}>
                        {userData?.getUser?.username}
                    </Text>
                    <Text style={styles.time}>
                        {timeSince(
                            new Date(
                                parseInt(data?.getPost?.createdAt || "")
                            ).toString()
                        )}
                    </Text>
                </View>
                <Text style={[globalStyles.heading, { marginTop: 10 }]}>
                    {data?.getPost?.title}
                </Text>
                <Text style={styles.description}>{data?.getPost?.body}</Text>
                <Text style={styles.boldCaps}>COMMENTS</Text>
                {commentsData?.getPostComments?.map((comment, i) => (
                    <Comment
                        key={comment.id}
                        isLast={
                            i ==
                            (commentsData.getPostComments?.length || Infinity) -
                                1
                        }
                        comment={comment}
                    />
                ))}
            </ScrollView>
            <View style={[globalStyles.flex, styles.inputBox]}>
                <Image
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                    }}
                    source={{ uri: meData?.me?.imgUrl }}
                />
                <TextInput
                    value={comment}
                    onChangeText={(t) => setComment(t)}
                    onSubmitEditing={handleSubmit}
                    style={styles.input}
                    placeholder={"Comment goes here.."}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        padding: layout.padding + 10,
        marginBottom: 25,
    },
    time: {
        color: colors.purple,
        marginLeft: "auto",
        marginRight: 0,
        fontSize: 15,
        fontWeight: "600",
    },
    description: {
        color: colors.gray,
        paddingTop: 7,
        fontSize: 18,
    },

    icon: {
        color: "#374151",
        marginLeft: "auto",
        marginRight: 5,
    },
    count: {
        paddingHorizontal: 6,
        fontWeight: "500",
    },
    img: {
        width: 35,
        height: 35,
        borderRadius: 999,
        borderColor: colors.gray,
        borderWidth: 0.5,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 10,
    },
    eventName: {
        fontSize: 16,
        color: colors.lightGray,
        fontWeight: "500",
    },
    boldCaps: {
        fontWeight: "700",
        marginTop: 30,
        marginBottom: 3,
        color: colors.gray,
        fontSize: 16,
    },
    input: {
        backgroundColor: colors.wheat,
        color: "#000",
        fontWeight: "500",
        fontSize: 17,
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 7,
        width: "90%",
    },
    inputBox: {
        borderTopColor: colors.gray,
        borderTopWidth: 0.5,
        width: "100%",
        padding: 11,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
    },
});
