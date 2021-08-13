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

interface CardProps {
    post: any;
    title: string;
    description: string;
    date: string;
}

export const Card: React.FC<CardProps> = ({
    post,
    title,
    description,
    date,
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
        <View style={styles.card}>
            <View style={globalStyles.flex}>
                <Image
                    style={styles.img}
                    source={{
                        uri: data ? data.getUser?.imgUrl : emptyIcon,
                    }}
                />
                <View style={[globalStyles.flex, { alignItems: "center" }]}>
                    <Text style={styles.username}>
                        {data?.getUser?.username} {"  "}•{"  "}
                    </Text>
                    <Text style={styles.eventName}>{d?.getEvent?.name}</Text>
                </View>
                <Text style={styles.time}>{timeSince(date)}</Text>
            </View>
            <Text style={[globalStyles.heading, { marginTop: 10 }]}>
                {title}
            </Text>
            <Text style={styles.description}>{truncate(description, 122)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
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
