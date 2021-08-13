import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Event } from "./Search/Event";
import { MainStackNav } from "./MainNav";
import { SearchStackParamList } from "./SearchNav";
import { SearchPage } from "./Search/SearchPage";
import { UserProfile } from "./Search/UserProfile";
import { Text } from "react-native";
import { useGetEventQuery } from "../../generated/graphql";
import { Post } from "./Search/Post";
import { NewPost } from "./Search/NewPost";

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
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name={"UserProfile"}
                component={UserProfile}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
                name={"Event"}
                component={Event}
            />
            <Stack.Screen name={"Post"} component={Post} />
            <Stack.Screen
                options={{
                    headerTitle: "New Post",
                }}
                name={"NewPost"}
                component={NewPost}
            />
        </Stack.Navigator>
    );
};
