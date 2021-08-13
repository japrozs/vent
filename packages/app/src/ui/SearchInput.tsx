import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { colors, layout } from "./theme";
import { Entypo } from "@expo/vector-icons";

interface SearchInputProps {}

export const SearchInput: React.FC<SearchInputProps> = ({}) => {
    return (
        <View style={styles.container}>
            <AntDesign
                name="search1"
                style={styles.icon}
                size={layout.iconSize - 5}
                color={colors.gray}
            />
            <TextInput
                placeholder={"Search"}
                style={styles.input}
                autoCapitalize="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.wheat,
    },
    input: {
        padding: 14,
        width: "100%",
        fontSize: 18,
        color: "#000",
        fontWeight: "500",
    },
    icon: {
        paddingHorizontal: 10,
    },
});
