import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SearchResult } from "../utils/search";
import { globalStyles, colors, layout } from "../ui/theme";
import { emptyIcon } from "../constants";
import { truncate } from "../utils/truncate";
import { MainStackParamList } from "../modules/Main/MainNav";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { SearchStackParamList } from "../modules/Main/SearchNav";

interface ResultCardProps {
    result: SearchResult;
    navigation: BottomTabNavigationProp<SearchStackParamList, "SearchPage">;
}

export const ResultCard: React.FC<ResultCardProps> = ({
    result,
    navigation,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (result.type == "event") {
                    navigation.navigate("Event", { eventId: result.id });
                } else {
                    navigation.navigate("UserProfile", { userId: result.id });
                }
            }}
        >
            <View style={styles.container}>
                <View style={globalStyles.flex}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: result ? result.imgUrl : emptyIcon,
                        }}
                    />
                    {result.type == "event" ? (
                        <View
                            style={{
                                marginLeft: 4,
                            }}
                        >
                            <Text style={styles.eventName}>{result.name}</Text>
                            <Text style={styles.description}>
                                {truncate(result.tagLine || "", 30)}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.username}>{result.name}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding + 5,
        backgroundColor: "#fff",
    },
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
        paddingTop: 2,
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
        fontSize: 20,
        color: "#000",
        fontWeight: "600",
    },
});
