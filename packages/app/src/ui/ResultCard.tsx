import React from "react";
import { Text, View } from "react-native";
import { SearchResult } from "../utils/search";

interface ResultCardProps {
    result: SearchResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    return (
        <View>
            <Text>{result.name}</Text>
        </View>
    );
};
