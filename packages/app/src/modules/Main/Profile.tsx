import React from "react";
import { Text, View } from "react-native";
import { MainStackNav } from "./MainNav";

interface ProfileProps {}

export const Profile: React.FC<MainStackNav<"Profile">> = ({}) => {
    return (
        <View>
            <Text>profile page</Text>
        </View>
    );
};
