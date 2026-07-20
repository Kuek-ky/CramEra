import { useState } from "react";
import { Link, router } from "expo-router";

import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import Screen from "@/components/common/Screen";
import Card from "@/components/common/Card";

import {
    Colors,
    Spacing,
    Radius,
    Typography,
} from "@/theme/Index";
import {storeUserData, userStorage} from "@/api/asyncStoreUser";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
console.log(API_BASE)

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Artificial delay for around 2 seconds to make it less clunky for the loading -> result process

export default function Login() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    // ^^ in charge of what UI to show, status can only be one of these 4 string values
    // By default, it will be in idle state
    const [message, setMessage] = useState("");
    // ^^ stores backend response/ error message

    async function submitButton() {
        if (userName.trim() === "") {
            setStatus("error");
            setMessage("Please enter a username.");
            return;
        } else if (userPassword.trim() === "") {
            setStatus("error");
            setMessage("Please enter a password.");
            return;
        }

        try {
            setStatus("loading");
            setMessage("");
            console.log("Sending user to backend");

            const response = await fetch(`${API_BASE}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    userName: userName,
                    userPassword: userPassword
                }),
            });
            // ^^ to get the whole HTTP response, status code, headers etc...

            await sleep(1000);

            if (response.ok) {
                const user = await response.json();
                await storeUserData(user.userId, user.userName, user.userEmail);

                router.replace({
                    pathname: "/maintabs/home"
                })
            } else {
                const result = await response.text();

                setStatus("error");
                setMessage(result);
            }
        } catch (error) {
            await sleep(1000);
            setStatus("error");
            setMessage("Login failed");
        }
    }

    return (
        <Screen>
            <Card style={styles.card}>
                <Text style={styles.title}>
                    Welcome Back
                </Text>

                <Text style={styles.subtitle}>
                    Sign in to continue
                </Text>
                <TextInput
                    placeholder="Username"
                    value={userName}
                    onChangeText={setUserName}
                    style={styles.input} />
                <TextInput
                    placeholder="Password"
                    value={userPassword}
                    onChangeText={setUserPassword}
                    secureTextEntry={true}
                    style={styles.input} />

                <Pressable
                    onPress={submitButton}
                    disabled={status === "loading"}
                    // ^^ to avoid impatient ppl from spamming the button
                    style={[
                        styles.button,
                        status === "loading" && styles.buttonDisabled,
                    ]}
                >
                    <Text style={styles.buttonText}>
                        {status === "loading" ? "Signing in..." : "Sign in"}
                    </Text>
                </Pressable>
                {status === "loading" && <ActivityIndicator style={{ marginTop: 16 }} />}
                {status === "error" && <Text style={styles.error}>{message}</Text>}

                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>

                    <Link href="/signup">
                        <Text style={styles.link}>
                            Create account
                        </Text>
                    </Link>
                </View>
            </Card>
        </Screen>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        maxWidth: 360,
        alignSelf: "center",
        marginTop: 100,
        alignItems: "center",
    },

    title: {
        ...Typography.h1,
        marginBottom: Spacing.xs,
    },

    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },

    input: {
        width: "100%",
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        marginTop: Spacing.md,
        ...Typography.body,
    },

    button: {
        marginTop: Spacing.lg,
        width: "100%",
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: Radius.md,
        alignItems: "center",
    },

    buttonDisabled: {
        backgroundColor: Colors.border,
    },

    buttonText: {
        ...Typography.button,
        color: Colors.white,
    },

    error: {
        marginTop: Spacing.md,
        color: Colors.danger,
        ...Typography.bodySmall,
    },

    footer: {
        flexDirection: "row",
        marginTop: Spacing.lg,
    },

    link: {
        color: Colors.primary,
        textDecorationLine: "underline",
        ...Typography.bodySmall,
    },
});

