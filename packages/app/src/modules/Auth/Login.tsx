import { useApolloClient } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useLoginMutation } from "../../generated/graphql";
import { colors, globalStyles, layout } from "../../ui/theme";
import { errorToMap } from "../../utils/errorToMap";
import { notEmpty } from "../../utils/notEmpty";
import { AuthStackNav, AuthStackParamList } from "./AuthNav";

interface LoginProps {}

interface ErrorProps {
    usernameOrEmail?: string;
    password?: string;
}

export const Login: React.FC<AuthStackNav<"Login">> = ({ navigation }) => {
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [errors, setErrors] = useState<ErrorProps>({});
    const apolloClient = useApolloClient();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { loading }] = useLoginMutation();

    const handleSubmit = async () => {
        const response = await login({
            variables: {
                usernameOrEmail,
                password,
            },
        });

        if (response.data?.login.errors) {
            return setErrors(errorToMap(response.data?.login.errors));
        }

        apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                value={usernameOrEmail}
                onChangeText={(t) => setUsernameOrEmail(t)}
                placeholder={"Username or Email"}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    usernameFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("usernameOrEmail")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("usernameOrEmail") ? (
                <Text style={styles.error}>{errors.usernameOrEmail}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={(t) => setPassword(t)}
                placeholder={"Password"}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                autoCapitalize={"none"}
                secureTextEntry={true}
                style={[
                    styles.input,
                    passFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("password")
                        ? {
                              borderColor: colors.red,
                              borderWidth: 1,
                          }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("password") ? (
                <Text style={styles.error}>{errors.password}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                style={[globalStyles.button]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <View
                style={[
                    globalStyles.flex,
                    { justifyContent: "center", marginTop: 20 },
                ]}
            >
                <Text style={styles.subText}>
                    Don{"'"}t have an account?{" "}
                    <Text
                        style={styles.ctx}
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    >
                        Sign up
                    </Text>
                </Text>
            </View>
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
