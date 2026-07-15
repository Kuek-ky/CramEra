import * as Device from 'expo-device';
import {useEffect, useState} from "react";
import {ActivityIndicator, Platform, Text, View, Button} from "react-native";
import {Link, router, useRouter} from "expo-router";

const API_BASE = "http://172.18.110.10:8080"; //ip address to come from your wsl container, NOT YOUR LOCAL MACHINE

/*
* Am testing out some code by making a default landing page
* have commented out the pages loaded in by the Expo app
*/
export default function Landing() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/examplehere/testing`)
      .then((res) => res.text())
      .then((text) => { setMessage(text); setStatus("ok"); })
      .catch((err) => { setMessage(err.message); setStatus("error"); });

  }, []);

const router = useRouter();
  return (
      <View
          style={{
            flex: 1,
            backgroundColor: "#eef5ff",
            paddingTop: 60,
            paddingHorizontal: 20,
          }}
      >
        {/* Header */}
        <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 20,
            }}
        >
          Library 📚
        </Text>

        {/* Backend Status */}
        <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 12,
              marginBottom: 20,
            }}
        >
          <Text style={{ fontWeight: "600" }}>Backend Status</Text>

          {status === "loading" && <ActivityIndicator />}

          {status === "ok" && (
              <Text style={{ color: "green", marginTop: 8 }}>
                {message}
              </Text>
          )}

          {status === "error" && (
              <Text style={{ color: "red", marginTop: 8 }}>
                {message}
              </Text>
          )}
        </View>

        {/* Search Bar */}
        <View
            style={{
              backgroundColor: "white",
              borderRadius: 30,
              padding: 15,
              marginBottom: 20,
            }}
        >
          <Text style={{ color: "grey" }}>🔍 Search...</Text>
        </View>

        {/* Example Cards */}
        <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
            }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            CS2040 Notes
          </Text>

          <Text style={{ color: "grey", marginTop: 5 }}>
            Algorithms and Data Structures
          </Text>
        </View>

        <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              padding: 20,
            }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            IS216 Cheatsheet
          </Text>

          <Text style={{ color: "grey", marginTop: 5 }}>
            Software Product Management
          </Text>
        </View>

          {/*  for testing navigation, can remove when login/signup is set up*/}
          <Button title="Go To Home"
                  onPress={() =>
                      router.navigate('/maintabs/home')}
          />


      </View>
  );
}



