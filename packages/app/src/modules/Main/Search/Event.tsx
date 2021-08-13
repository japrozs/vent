import React from "react";
import { Text, View } from "react-native";
import { MainStackNav } from "../MainNav";

interface EventProps {}

export const Event: React.FC<MainStackNav<"Event">> = ({ route }) => {
    return (
        <View>
            <Text>event page</Text>
            <Text>{route.params.eventId}</Text>
        </View>
    );
};
