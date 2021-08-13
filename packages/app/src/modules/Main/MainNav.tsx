import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
    Home: undefined;
    Search: {
        screen: string;
        params: {
            postId?: number;
            userId?: number;
            eventId?: number;
            name?: string;
        };
    };
    Profile: {
        userId: number;
    };
    NewEvent: undefined;
};

export type MainStackNav<RouteName extends keyof MainStackParamList> = {
    navigation: BottomTabNavigationProp<MainStackParamList, RouteName>;
    route: RouteProp<MainStackParamList, RouteName>;
};
