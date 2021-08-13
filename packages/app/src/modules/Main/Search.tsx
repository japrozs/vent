import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    useGetAllEventsQuery,
    useGetAllUsersQuery,
} from "../../generated/graphql";
import { ResultCard } from "../../ui/ResultCard";
import { SearchInput } from "../../ui/SearchInput";
import { colors, layout } from "../../ui/theme";
import { search } from "../../utils/search";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
    const { data, loading } = useGetAllEventsQuery();
    const { data: d, loading: fetching } = useGetAllUsersQuery();

    const [searchQuery, setSearchQuery] = useState("");
    return (
        <View>
            <View style={styles.container}>
                <AntDesign
                    name="search1"
                    style={styles.icon}
                    size={layout.iconSize - 5}
                    color={colors.gray}
                />
                <TextInput
                    value={searchQuery}
                    onChangeText={(t) => setSearchQuery(t)}
                    placeholder={"Search"}
                    style={styles.input}
                    autoCapitalize="none"
                />
            </View>
            <View>
                {searchQuery.trim().length != 0 ? (
                    search(searchQuery, data, d).map((result) => (
                        <ResultCard key={result.id} result={result} />
                    ))
                ) : (
                    <Text>no results found</Text>
                )}
            </View>
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
