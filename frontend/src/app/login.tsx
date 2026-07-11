import { useState } from "react";
import { Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";

// const API_BASE = "http://172.18.77.219:8080"; //ip address to come from your wsl container, NOT YOUR LOCAL MACHINE
const API_BASE = "http://localhost:8080";

function sleep(ms: number){
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Artificial delay for around 2 seconds to make it less clunky for the loading -> result process

export default function Login(){
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    // ^^ in charge of what UI to show, status can only be one of these 4 string values
    // By default, it will be in idle state
    const [message,setMessage] = useState("");
    // ^^ stores backend response/ error message

    async function submitButton(){
        if (userName.trim() === ""){
            setStatus("error");
            setMessage("Please enter a username.");
            return;
        } else if (userPassword.trim() === ""){
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
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify({
                    userName: userName,
                    userPassword: userPassword
                }),
            });
            // ^^ to get the whole HTTP response, status code, headers etc...

            await sleep(1000);

            if (response.ok){
                const user = await response.json();
                router.push({
                    pathname: "/profile",
                    params: {
                        userName: user.userName,
                        userEmail: user.userEmail,
                    },
                });
            } else {
                const result = await response.text();

                setStatus("error");
                setMessage(result);
            }
        } catch (error){
            await sleep(1000);
            setStatus("error");
            setMessage("Cannot reach backend :(");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <View style={{
                    width: 320,
                    padding: 28,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 12,
                    backgroundColor: "white",
                    alignItems: "center",
                }}>
                <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 32 }}>Login</Text>
                <TextInput
                    placeholder="Username"
                    value = {userName}
                    onChangeText={setUserName}
                    style={{borderWidth: 1, marginTop:12, padding: 8, borderRadius: 12, width: "100%"}}/>
                <TextInput
                    placeholder="Password"
                    value = {userPassword}
                    onChangeText={setUserPassword}
                    secureTextEntry={true}
                    style={{borderWidth: 1, marginTop:12, padding: 8, borderRadius: 12, width: "100%"}}/>

                <Pressable
                    onPress={submitButton}
                    disabled={status === "loading"}
                    // ^^ to avoid impatient ppl from spamming the button
                    style={{
                        marginTop: 16,
                        width: "100%",
                        backgroundColor: status === "loading" ? "#9CA3AF" : "#00AEEF",
                        padding: 8,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text style={{color: "white", fontWeight:"400"}}>
                        {status === "loading"? "Signing in..." : "Sign in"}
                    </Text>
                </Pressable>
                {status === "loading" && <ActivityIndicator style={{ marginTop: 16 }} />}
                {status === "error" && <Text style={{ marginTop: 16, color: "red" }}>{message}</Text>}

                <View style={{ flexDirection: "row", marginTop: 16 }}>
                    <Text>Don't have an account? </Text>

                    <Link href="/signup">
                        <Text style={{ color: "#00AEEF", textDecorationLine: "underline" }}>
                            Create account
                        </Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}

