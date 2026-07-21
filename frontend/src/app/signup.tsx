import { useState } from "react";
import { Link, router } from "expo-router";
import {storeUserData, userStorage} from "@/api/asyncStoreUser";

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

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Artificial delay for around 2 seconds to make it less clunky for the loading -> result process

export default function SignUp() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    // ^^ in charge of what UI to show, status can only be one of these 4 string values
    // By default, it will be in idle state
    const [message, setMessage] = useState("");
    // ^^ stores backend response/ error message

    async function submitButton() {
        // === checks type and value
        if (userName.trim() === "") {
            setStatus("error");
            setMessage("Please enter a username.");
            return;
        } else if (userEmail.trim() === "") {
            setStatus("error");
            setMessage("Please enter an email.");
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

            const response = await fetch(`${API_BASE}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword
                }),
            });
            // ^^ to get the whole HTTP response, status code, headers etc...

            if (response.ok) {
                const user = await response.json();
                await storeUserData(user.userId, user.userName, user.userEmail);

                router.replace({
                    pathname: "/maintabs/home",
                    params: {
                        showDocs: "false"
                    }})

            } else {
                const result = await response.text();

                setStatus("error");
                setMessage(result);
            }

            console.log("Backend response:", result);
        } catch (error) {
            await sleep(1000);
            setStatus("error");
            setMessage("cannot reach backend :(");
        }
    }

    return (
        <Screen>

            <Card style={styles.card}>
                {/* ^^ for rectangular box */}

                <Text style={styles.title}>
                    Create Account
                </Text>

                <Text style={styles.subtitle}>
                    Join the study community
                </Text>
                <TextInput
                    placeholder="Username"
                    value={userName}
                    onChangeText={setUserName}
                    style={styles.input} />
                <TextInput
                    placeholder="Email"
                    value={userEmail}
                    onChangeText={setUserEmail}
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
                        {status === "loading" ? "Signing up..." : "Sign up"}
                    </Text>
                </Pressable>
                {status === "loading" && <ActivityIndicator
                    style={styles.loading}
                    color={Colors.primary}
                />}
                {status === "ok" && <Text style={styles.success}>{message}</Text>}
                {status === "error" && <Text style={styles.error}>{message}</Text>}

                <View style={styles.footer}>
                    <Text>Have an account already? </Text>

                    <Link href="/login">
                        <Text style={styles.link}>
                            Sign in
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
        marginTop: 80,
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

    loading: {
        marginTop: Spacing.md,
    },

    success: {
        marginTop: Spacing.md,
        color: Colors.success,
        ...Typography.bodySmall,
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