import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    useGetAllEventsQuery,
    useGetAllUsersQuery,
} from "../../../generated/graphql";
import { ResultCard } from "../../../ui/ResultCard";
import { SearchInput } from "../../../ui/SearchInput";
import { colors, layout } from "../../../ui/theme";
import { search } from "../../../utils/search";
import { MainStackNav } from "../MainNav";
import { SearchStackNav } from "../SearchNav";

interface SearchPageProps {}

export const SearchPage: React.FC<SearchStackNav<"SearchPage">> = ({
    navigation,
}) => {
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
                        <ResultCard
                            navigation={navigation}
                            key={result.id}
                            result={result}
                        />
                    ))
                ) : (
                    <Text>search something</Text>
                )}
                {searchQuery.trim().length != 0 &&
                search(searchQuery, data, d).length == 0 ? (
                    <Text>no search results found!</Text>
                ) : (
                    <View />
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
        width: "75%",
        fontSize: 18,
        color: "#000",
        fontWeight: "500",
    },
    icon: {
        paddingHorizontal: 10,
    },
});
