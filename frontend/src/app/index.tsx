import * as Device from 'expo-device';
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';


/*
@RestController
@RequestMapping("examplehere")
public class testcontroller {

	@GetMapping(path="/testing") //find this on localhost:8080/examplehere/testing, using postman
	public String getTest() {
		return "if you can see this, get is successful :D";
	}

}
*/

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

  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
  //     <Text style={{ fontSize: 28, fontWeight: "600" }}>CramEra</Text>
  //     {status === "loading" && <ActivityIndicator style={{ marginTop: 16 }} />}
  //     {status === "ok" && <Text style={{ marginTop: 16 }}>Backend says: {message}</Text>}
  //     {status === "error" && <Text style={{ marginTop: 16, color: "red" }}>Can't reach backend: {message}</Text>}
  //   </View>
  // );

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

      </View>
  );
}


function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

/*
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}
*/
