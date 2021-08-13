import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRegisterMutation } from "../../generated/graphql";
import { colors, globalStyles, layout } from "../../ui/theme";
import { errorToMap } from "../../utils/errorToMap";
import { AuthStackNav } from "./AuthNav";

interface RegisterProps {}

interface ErrorProps {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
}

export const Register: React.FC<AuthStackNav<"Register">> = ({
    navigation,
}) => {
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [errors, setErrors] = useState<ErrorProps>({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [register, { loading }] = useRegisterMutation();
    const apolloClient = useApolloClient();

    const handleSubmit = async () => {
        const response = await register({
            variables: {
                options: {
                    email,
                    name,
                    password,
                    username,
                },
            },
        });

        if (response.data?.register.errors) {
            return setErrors(errorToMap(response.data?.register.errors));
        }

        apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={(t) => setEmail(t)}
                placeholder={"Email"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                autoCapitalize={"none"}
                style={[
                    styles.input,
                    emailFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("email")
                        ? { borderColor: colors.red, borderWidth: 1 }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("email") ? (
                <Text style={styles.error}>{errors.email}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Username</Text>
            <TextInput
                value={username}
                onChangeText={(t) => setUsername(t)}
                placeholder={"Username"}
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
                    errors.hasOwnProperty("username")
                        ? { borderColor: colors.red, borderWidth: 1 }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("username") ? (
                <Text style={styles.error}>{errors.username}</Text>
            ) : (
                <></>
            )}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                value={name}
                onChangeText={(t) => setName(t)}
                placeholder={"Full Name"}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                style={[
                    styles.input,
                    nameFocus
                        ? {
                              borderColor: colors.purple,
                              borderWidth: 1,
                          }
                        : {},
                    errors.hasOwnProperty("name")
                        ? { borderColor: colors.red, borderWidth: 1 }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("name") ? (
                <Text style={styles.error}>{errors.name}</Text>
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
                        ? { borderColor: colors.red, borderWidth: 1 }
                        : {},
                ]}
            />
            {errors.hasOwnProperty("password") ? (
                <Text style={styles.error}>{errors.password}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.subText}>
                Already have an account?{" "}
                <Text
                    style={styles.ctx}
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    Log In
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.padding,
        marginTop: 50,
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
