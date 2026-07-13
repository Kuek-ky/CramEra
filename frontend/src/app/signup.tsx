import { useState } from "react";
import { Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";

// const API_BASE = "http://172.18.77.219:8080"; //ip address to come from your wsl container, NOT YOUR LOCAL MACHINE
const API_BASE = "http://172.18.110.10:8080";

function sleep(ms: number){
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Artificial delay for around 2 seconds to make it less clunky for the loading -> result process

export default function SignUp(){
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    // ^^ in charge of what UI to show, status can only be one of these 4 string values
    // By default, it will be in idle state
    const [message,setMessage] = useState("");
    // ^^ stores backend response/ error message

    async function submitButton(){
        // === checks type and value
        if (userName.trim() === ""){
            setStatus("error");
            setMessage("Please enter a username.");
            return;
        } else if (userEmail.trim() === ""){
            setStatus("error");
            setMessage("Please enter an email.");
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

            const response = await fetch(`${API_BASE}/api/users`, {
                method: "POST",
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword
                }),
            });
            // ^^ to get the whole HTTP response, status code, headers etc...

            const result = await response.text();
            // ^^ actual message, like "Email must contain at least one @" or smt

            if (response.ok){
                await sleep(1000);
                router.push({
                    pathname: "/profile",
                    params: {
                        userName: userName,
                        userEmail: userEmail,
                    },
                });
            } else {
                setStatus("error");
                setMessage(result);
            }

            console.log("Backend response:", result);
        } catch (error){
            await sleep(1000);
            setStatus("error");
            setMessage("cannot reach backend :(");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>

            <View
                style={{
                    width: 320,
                    padding: 28,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 12,
                    backgroundColor: "white",
                    alignItems: "center",
                }}
            >
                {/* ^^ for rectangular box */}

            <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 32 }}>Create Account</Text>
            <TextInput
                placeholder="Username"
                value = {userName}
                onChangeText={setUserName}
                style={{borderWidth: 1, marginTop:12, padding: 8, borderRadius: 12, width: "100%"}}/>
            <TextInput
                placeholder="Email"
                value = {userEmail}
                onChangeText={setUserEmail}
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
                    {status === "loading"? "Signing up..." : "Sign up"}
                </Text>
            </Pressable>
            {status === "loading" && <ActivityIndicator style={{ marginTop: 16 }} />}
            {status === "ok" && <Text style={{ marginTop: 16 }}>{message}</Text>}
            {status === "error" && <Text style={{ marginTop: 16, color: "red" }}>{message}</Text>}

            <View style={{ flexDirection: "row", marginTop: 16 }}>
                <Text>Have an account already? </Text>

                <Link href="/login">
                    <Text style={{ color: "#00AEEF", textDecorationLine: "underline" }}>
                        Sign in
                    </Text>
                </Link>
            </View>
            </View>
        </View>
    );
}