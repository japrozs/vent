import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type SearchStackParamList = {
    SearchPage: undefined;
    UserProfile: {
        userId: number;
        name: string;
    };
    Event: {
        eventId: number;
        name: string;
    };
    Post: {
        postId: number;
    };
    NewPost: {
        eventId: number;
    };
};

export type SearchStackNav<RouteName extends keyof SearchStackParamList> = {
    navigation: BottomTabNavigationProp<SearchStackParamList, RouteName>;
    route: RouteProp<SearchStackParamList, RouteName>;
};
