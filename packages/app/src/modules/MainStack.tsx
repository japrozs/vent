import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Main } from "./Main/Main";
import { MainStackParamList } from "./Main/MainNav";
import { Search } from "./Main/Search";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors, layout, globalStyles } from "../ui/theme";
import { Image, StyleSheet, Text, View } from "react-native";
import { useMeQuery } from "../generated/graphql";
import { Profile } from "./Main/Profile";
import { constants, emptyIcon } from "../constants";
import { NewEvent } from "./Main/NewEvent";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface MainStackProps {}

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack: React.FC<MainStackProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <Tab.Navigator initialRouteName={"Home"}>
            <Tab.Screen
                options={{
                    headerLeft: () => (
                        <Image
                            style={styles.img}
                            source={require("../../assets/logo.png")}
                        />
                    ),
                    headerRight: () => (
                        <Ionicons
                            style={{
                                marginRight: layout.padding,
                            }}
                            name="ios-settings-sharp"
                            size={layout.iconSize - 5}
                            color={colors.lightBlack}
                        />
                    ),
                    headerTitle: "",
                    tabBarStyle: {
                        borderTopColor: colors.inActive,
                        borderTopWidth: 1,
                    },
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.inActive,
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={layout.iconSize}
                            color={focused ? colors.active : colors.inActive}
                        />
                    ),
                }}
                name="Home"
                component={Main}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.inActive,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={layout.iconSize}
                            color={focused ? colors.active : colors.inActive}
                        />
                    ),
                }}
                name="Search"
                component={Search}
            />
            <Tab.Screen
                options={{
                    headerTitle: "New Event",
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.inActive,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="plus-square-o"
                            size={layout.iconSize}
                            color={focused ? colors.active : colors.inActive}
                        />
                    ),
                }}
                name="NewEvent"
                component={NewEvent}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.inActive,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={[
                                {
                                    width: 35,
                                    height: 35,
                                    borderRadius: 999,
                                    borderWidth: 1,
                                },
                                focused
                                    ? { borderColor: "#292929" }
                                    : {
                                          borderColor: colors.inActive,
                                      },
                            ]}
                            source={{
                                uri: data ? data.me?.imgUrl : emptyIcon,
                            }}
                        />
                    ),
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    img: {
        height: constants.logoHeight,
        width: constants.logoWidth,
        marginLeft: layout.padding,
    },
});
