import { useApolloClient } from "@apollo/client";
import React from "react";
import { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useCreateEventMutation } from "../../generated/graphql";
import { colors, globalStyles, layout } from "../../ui/theme";
import { errorToMap } from "../../utils/errorToMap";
import { MainStackNav } from "./MainNav";

interface NewEventProps {}

interface ErrorProps {
    name?: string;
    tagLine?: string;
    description?: string;
}

export const NewEvent: React.FC<MainStackNav<"NewEvent">> = ({
    navigation,
}) => {
    const [nameFocus, setNameFocus] = useState(false);
    const [tagLineFocus, setTagLineFocus] = useState(false);
    const [descriptionFocus, setdescriptionFocus] = useState(false);

    const [name, setName] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [description, setDescription] = useState("");

    const [createEvent] = useCreateEventMutation();

    const disabled =
        name.trim().length == 0 ||
        tagLine.trim().length == 0 ||
        description.trim().length == 0;

    const apolloClient = useApolloClient();

    const handleSubmit = async () => {
        const response = await createEvent({
            variables: {
                options: {
                    name,
                    tagLine,
                    description,
                },
            },
        });

        if (response.data?.createEvent.errors) {
            return setErrors(errorToMap(response.data?.createEvent.errors));
        }

        apolloClient.resetStore();
        navigation.navigate("Home");
    };

    const [errors, setErrors] = useState<ErrorProps>({});
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={(t) => setName(t)}
                placeholder={"Name"}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    nameFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("name")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("name") ? (
                <Text style={styles.error}>{errors.name}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>TagLine</Text>
            <TextInput
                value={tagLine}
                onChangeText={(t) => setTagLine(t)}
                placeholder={"Tag Line"}
                onFocus={() => setTagLineFocus(true)}
                onBlur={() => setTagLineFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    tagLineFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("tagLine")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("tagLine") ? (
                <Text style={styles.error}>{errors.tagLine}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={(t) => setDescription(t)}
                placeholder={"Description"}
                onFocus={() => setdescriptionFocus(true)}
                onBlur={() => setdescriptionFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    descriptionFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("description")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("description") ? (
                <Text style={styles.error}>{errors.description}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                style={[globalStyles.button]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Event</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding,
        marginTop: 100,
    },
    input: {
        borderColor: colors.inActive,
        borderRadius: 4,
        borderWidth: 0.7,
        padding: 13,
        fontSize: 18,
        fontWeight: "500",
    },
    label: {
        color: "#000",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
    },
    subText: {
        textAlign: "center",
        color: "#000",
        fontSize: 18,
    },

    ctx: {
        color: colors.purple,
        fontWeight: "500",
    },
    error: {
        color: colors.red,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "500",
    },
});
