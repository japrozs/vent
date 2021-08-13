import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./modules/MainStack";
import { useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import * as Linking from "expo-linking";

const prefix = Linking.makeUrl("/");

const linking = {
    prefixes: [prefix],
    config: {
        screens: {
            event: "event/:id",
        },
    },
};

export default function Routes() {
    const { data, loading } = useMeQuery();

    let body: any = null;
    if (!loading && data?.me != null) {
        body = <MainStack />;
    } else {
        body = <AuthStack />;
    }
    return <NavigationContainer linking={linking}>{body}</NavigationContainer>;
}
