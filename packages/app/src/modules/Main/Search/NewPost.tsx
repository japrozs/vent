import { useApolloClient } from "@apollo/client";
import React from "react";
import { useState } from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {
    useCreatePostMutation,
    useGetEventQuery,
} from "../../../generated/graphql";
import { colors, globalStyles, layout } from "../../../ui/theme";
import { errorToMap } from "../../../utils/errorToMap";
import { SearchStackNav } from "../SearchNav";

interface NewPostProps {}

interface ErrorProps {
    title?: string;
    body?: string;
}

export const NewPost: React.FC<SearchStackNav<"NewPost">> = ({
    route,
    navigation,
}) => {
    const [titleFocus, setTitleFocus] = useState(false);
    const [bodyFocus, setBodyFocus] = useState(false);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [errors, setErrors] = useState<ErrorProps>({});

    const [createPost] = useCreatePostMutation();
    const apolloClient = useApolloClient();

    const { data } = useGetEventQuery({
        variables: {
            id: route.params.eventId as number,
        },
    });

    const handleSubmit = async () => {
        const res = await createPost({
            variables: {
                options: {
                    title,
                    body,
                    eventId: route.params.eventId,
                },
            },
        });

        if (res.data?.createPost?.errors) {
            return setErrors(errorToMap(res.data?.createPost?.errors));
        }

        apolloClient.resetStore();
        navigation.navigate("Event", {
            eventId: route.params.eventId as number,
            name: data?.getEvent?.name || "Event",
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={(t) => setTitle(t)}
                placeholder={"Title ..."}
                onFocus={() => setTitleFocus(true)}
                onBlur={() => setTitleFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    titleFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("title")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("title") ? (
                <Text style={styles.error}>{errors.title}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Body</Text>
            <TextInput
                value={body}
                onChangeText={(t) => setBody(t)}
                placeholder={"Body goes here ..."}
                onFocus={() => setBodyFocus(true)}
                onBlur={() => setBodyFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    bodyFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("body")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("body") ? (
                <Text style={styles.error}>{errors.body}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                style={[globalStyles.button]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Post</Text>
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
    error: {
        color: colors.red,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "500",
    },
});
