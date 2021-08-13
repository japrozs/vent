import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { emptyIcon } from "../../../constants";
import { useGetPostQuery, useGetUserQuery } from "../../../generated/graphql";
import { Card } from "../../../ui/Card";
import { colors, globalStyles, layout } from "../../../ui/theme";
import { timeSince } from "../../../utils/timeSince";
import { SearchStackNav } from "../SearchNav";

interface PostProps {}

export const Post: React.FC<SearchStackNav<"Post">> = ({ route }) => {
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

    return (
        <View style={styles.card}>
            <View style={globalStyles.flex}>
                <Image
                    style={styles.img}
                    source={{
                        uri: userData ? userData.getUser?.imgUrl : emptyIcon,
                    }}
                />
                <Text style={styles.username}>
                    {userData?.getUser?.username} {"  "}•{"  "}
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
});
