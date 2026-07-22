import {useState} from "react";
import {Text, View} from "react-native";
import SearchScreen from "@/components/search"
import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";
import { useLocalSearchParams } from "expo-router";

import {
    Colors,
    Radius,
} from "@/theme/Index";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

/*
* Am testing out some code by making a default landing page
* have commented out the pages loaded in by the Expo app
*/
export default function Landing() {
    const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
    const [message, setMessage] = useState("");
    const { userId } = useLocalSearchParams<{
        userId?: string;
    }>();

    return (
        <Screen>
            {/* Header */}
            <Header
                title="Library"
                subtitle="Browse documents and flashcards"
            />

            {/* Backend Status */}
            <View
                style={{
                    backgroundColor: Colors.border,
                    borderRadius: 30,
                    marginBottom: 20,
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: Colors.primaryLight
                }}
            >
                <View style={{
                    backgroundColor: Colors.surface,
                    padding: 7,
                    borderRadius: Radius.pill,
                    width: "50%"
                }}>
                    <Text style={{
                        textAlign: "center"
                    }}>Documents</Text>
                </View>
                <View style={{
                    alignContent: "center",
                    padding: 7,
                    width: "50%"
                }}>
                    <Text style={{
                        color: Colors.surface,
                        textAlign: "center"
                    }}>Flashcards (WIP)</Text>
                </View>
            </View>
            <SearchScreen userId={userId} />

        </Screen>
    );
}






