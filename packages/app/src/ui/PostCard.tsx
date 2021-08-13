import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { colors, globalStyles, layout } from "./theme";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { timeSince } from "../utils/timeSince";
import {
    GetAllEventsQuery,
    useGetEventQuery,
    useGetUserQuery,
} from "../generated/graphql";
import { emptyIcon } from "../constants";
import { truncate } from "../utils/truncate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainStackParamList } from "../modules/Main/MainNav";
import { SearchStackParamList } from "../modules/Main/SearchNav";

interface PostCardProps {
    post: any;
    title: string;
    description: string;
    date: string;
    isFirst: boolean;
    navigation: BottomTabNavigationProp<SearchStackParamList, "Event">;
}

export const PostCard: React.FC<PostCardProps> = ({
    post,
    title,
    description,
    navigation,
    date,
    isFirst,
}) => {
    const { data, loading } = useGetUserQuery({
        variables: {
            id: post.creatorId,
        },
    });

    const { data: d, loading: fetching } = useGetEventQuery({
        variables: {
            id: post.eventId,
        },
    });
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Post", {
                    postId: post.id,
                });
            }}
        >
            <View
                style={[
                    styles.card,
                    isFirst
                        ? {
                              borderTopColor: colors.borderGray,
                              borderTopWidth: 0.5,
                          }
                        : {},
                ]}
            >
                <View style={globalStyles.flex}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: data ? data.getUser?.imgUrl : emptyIcon,
                        }}
                    />
                    <Text style={styles.username}>
                        {data?.getUser?.username}
                    </Text>
                    <Text style={styles.time}>{timeSince(date)}</Text>
                </View>
                <Text style={[globalStyles.heading, { marginTop: 2 }]}>
                    {truncate(title, 25)}
                </Text>
                <Text style={styles.description}>
                    {truncate(description, 122)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        paddingBottom: layout.paddingVertical,
        paddingTop: layout.paddingVertical,
        borderBottomColor: colors.borderGray,
        borderBottomWidth: 0.5,
        padding: layout.padding,
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
