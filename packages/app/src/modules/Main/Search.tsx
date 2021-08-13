import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Event } from "./Search/Event";
import { MainStackNav } from "./MainNav";
import { SearchStackParamList } from "./SearchNav";
import { SearchPage } from "./Search/SearchPage";
import { UserProfile } from "./Search/UserProfile";

interface SearchProps {}

const Stack = createStackNavigator<SearchStackParamList>();

export const Search: React.FC<MainStackNav<"Search">> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={"SearchPage"}>
            <Stack.Screen
                options={{
                    headerTitle: "Search",
                }}
                name={"SearchPage"}
                component={SearchPage}
            />
            <Stack.Screen name={"UserProfile"} component={UserProfile} />
            <Stack.Screen name={"Event"} component={Event} />
        </Stack.Navigator>
    );
};
