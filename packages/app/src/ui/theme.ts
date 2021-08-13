import { StyleSheet } from "react-native";

export const colors = {
    active: "#000",
    lightBlack: "#1A202C",
    inActive: "#a3a3a3",
    wheat: "#E5E7EB",
    purple: "#6D28D9",
    gray: "#4B5563",
    red: "#DC2626",
    lightGray: "#4A5568",
    dogeBlack: "#0B0E11",
};
export const layout = {
    iconSize: 30,
    borderRadius: 4,
    padding: 13,
};

export const globalStyles = StyleSheet.create({
    label: {
        fontSize: 13,
    },

    heading: {
        fontSize: 30,
        fontWeight: "600",
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        width: "100%",
        marginVertical: 20,
        borderRadius: 4,
        backgroundColor: colors.purple,
        padding: layout.padding,
    },
});
