import { useApolloClient } from "@apollo/client";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { constants, emptyIcon } from "../../../constants";
import {
    useGetEventPostsQuery,
    useGetEventQuery,
    useGetUserQuery,
} from "../../../generated/graphql";
import { Card } from "../../../ui/Card";
import { PostCard } from "../../../ui/PostCard";
import { colors, globalStyles, layout } from "../../../ui/theme";
import { MainStackNav } from "../MainNav";
import { SearchStackNav } from "../SearchNav";

interface EventProps {}

export const Event: React.FC<SearchStackNav<"Event">> = ({
    route,
    navigation,
}) => {
    const { data, loading } = useGetEventQuery({
        variables: {
            id: route.params.eventId,
        },
    });

    const { data: user, loading: fetching } = useGetUserQuery({
        variables: {
            id: data?.getEvent?.creatorId as number,
        },
    });

    const { data: posts, loading: postsLoading } = useGetEventPostsQuery({
        variables: {
            id: route.params.eventId,
        },
    });
    return (
        <ScrollView>
            <View>
                <Image
                    style={styles.bg}
                    source={{ uri: data?.getEvent?.imgUrl || emptyIcon }}
                />
                <View style={styles.container}>
                    <Text
                        style={[
                            globalStyles.heading,
                            { fontWeight: "700", fontSize: 35 },
                        ]}
                    >
                        {data?.getEvent?.name}
                    </Text>
                    <Text style={styles.description}>
                        {data?.getEvent?.tagLine}
                    </Text>
                    <View style={globalStyles.flex}>
                        <Text style={styles.createdAt}>
                            Created by{" "}
                            <Text style={{ fontWeight: "600" }}>
                                {user?.getUser?.username}
                            </Text>{" "}
                            on{" "}
                            <Text style={{ fontWeight: "600" }}>
                                {new Date(
                                    parseInt(data?.getEvent?.createdAt || "")
                                ).toLocaleDateString()}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        padding: layout.padding,
                    }}
                >
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => {
                            navigation.navigate("NewPost", {
                                eventId: data?.getEvent?.id as number,
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>Create new post</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {posts?.getEventPosts?.map((post, i) => (
                        <PostCard
                            isFirst={i == 0}
                            navigation={navigation}
                            key={post.id}
                            date={new Date(parseInt(post.createdAt)).toString()}
                            post={post}
                            title={post.title}
                            description={post.body}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding,
    },
    bg: {
        width: "100%",
        height: 150,
    },
    description: {
        color: colors.dogeBlack,
        paddingTop: 5,
        fontSize: 20,
        marginVertical: 4,
        fontWeight: "500",
    },
    createdAt: {
        color: colors.gray,
        fontSize: 18,
        marginTop: 4,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
    },
});
