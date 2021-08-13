import React from "react";
import { Text, View } from "react-native";
import { MainStackNav } from "../MainNav";

interface UserProfileProps {}

export const UserProfile: React.FC<MainStackNav<"UserProfile">> = ({
    route,
}) => {
    return (
        <View>
            <Text>user profile page</Text>
            <Text>{route.params.userId}</Text>
        </View>
    );
};
