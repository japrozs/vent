import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
    useGetUserEventsQuery,
    useGetUserPostsQuery,
    useGetUserQuery,
} from "../../../generated/graphql";
import { PostCard } from "../../../ui/PostCard";
import { colors, globalStyles, layout } from "../../../ui/theme";
import { MainStackNav } from "../MainNav";
import { SearchStackNav, SearchStackParamList } from "../SearchNav";

interface UserProfileProps {}

interface EventCardProps {
    event: {
        __typename?: "Event" | undefined;
        id: number;
        name: string;
        imgUrl: string;
        tagLine: string;
        description: string;
        creatorId: number;
        createdAt: string;
    };
    navigation: BottomTabNavigationProp<SearchStackParamList, "UserProfile">;
}

const EventCard: React.FC<EventCardProps> = ({ event, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Event", {
                    eventId: event.id,
                    name: event.name,
                });
            }}
        >
            <View style={styles.eventCard}>
                <View style={globalStyles.flex}>
                    <Image
                        style={styles.imgEvent}
                        source={{ uri: event.imgUrl }}
                    />
                    <View
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "500",
                            }}
                        >
                            {event.name}
                        </Text>
                        <Text
                            style={{
                                color: "#2e2e2e",
                                fontWeight: "400",
                                marginTop: 2,
                            }}
                        >
                            {event.tagLine}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const UserProfile: React.FC<SearchStackNav<"UserProfile">> = ({
    route,
    navigation,
}) => {
    const { data, loading } = useGetUserQuery({
        variables: {
            id: route.params.userId,
        },
    });

    const { data: eventData, loading: fetching } = useGetUserEventsQuery({
        variables: {
            id: route.params.userId,
        },
    });

    const { data: postsData, loading: postsFetching } = useGetUserPostsQuery({
        variables: {
            id: route.params.userId,
        },
    });
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={globalStyles.flex}>
                    <Image
                        style={styles.img}
                        source={{ uri: data?.getUser?.imgUrl }}
                    />
                    <View style={{ marginLeft: 25 }}>
                        <Text style={styles.username}>
                            {data?.getUser?.username}
                        </Text>
                        <Text style={styles.name}>{data?.getUser?.name}</Text>
                    </View>
                </View>
                <Text style={styles.boldCaps}>EVENTS</Text>
                <ScrollView horizontal={true}>
                    {eventData?.getUserEvents?.map((event) => {
                        console.log(event);
                        return (
                            <EventCard
                                navigation={navigation}
                                key={event.id}
                                event={event}
                            />
                        );
                    })}
                </ScrollView>
                <Text style={styles.boldCaps}>POSTS</Text>
                {postsData?.getUserPosts?.map((post, i) => (
                    <PostCard
                        date={new Date(parseInt(post.createdAt)).toString()}
                        description={post.body}
                        isFirst={i == 0}
                        showBorder={false}
                        addPadding={false}
                        navigation={navigation}
                        post={post}
                        title={post.title}
                        key={post.id}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding + 5,
    },
    img: {
        width: 80,
        height: 80,
        borderColor: colors.lightGray,
        borderWidth: 0.8,
        borderRadius: 999,
    },
    username: {
        fontSize: 22,
        fontWeight: "500",
    },
    name: {
        fontSize: 20,
        color: colors.lightGray,
        fontWeight: "500",
    },
    boldCaps: {
        fontWeight: "700",
        marginTop: 20,
        color: colors.lightGray,
        fontSize: 16,
    },
    imgEvent: {
        width: 30,
        height: 30,
        borderRadius: 999,
    },
    eventCard: {
        marginTop: 10,
        backgroundColor: colors.wheat,
        padding: layout.padding + 5,
        borderColor: colors.wheat,
        borderWidth: 1,
        borderRadius: 4,
        marginRight: layout.padding,
    },
});
