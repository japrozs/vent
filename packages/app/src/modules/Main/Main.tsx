import { useApolloClient } from "@apollo/client";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    useGetAllEventsQuery,
    useGetAllPostsQuery,
    useLogoutMutation,
    useMeQuery,
} from "../../generated/graphql";
import { Card } from "../../ui/Card";
import { layout, colors } from "../../ui/theme";
import { MainStackNav } from "./MainNav";

interface MainProps {}

export const Main: React.FC<MainStackNav<"Home">> = ({ navigation }) => {
    const { data, loading } = useGetAllPostsQuery();
    return (
        <View style={styles.container}>
            {data ? (
                data.getAllPosts?.map((post) => (
                    <Card
                        navigation={navigation}
                        key={post.id}
                        date={new Date(parseInt(post.createdAt)).toString()}
                        post={post}
                        title={post.title}
                        description={post.body}
                    />
                ))
            ) : (
                <Text>no posts found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding + 5,
        backgroundColor: "#fff",
        height: "100%",
    },
});
