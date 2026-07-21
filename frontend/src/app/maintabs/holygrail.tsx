import {useState} from "react";
import {Text, View} from "react-native";
import SearchScreen from "@/components/search"
import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";

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

            {/*/!* Search Bar *!/*/}
            {/*<View*/}
            {/*    style={{*/}
            {/*        backgroundColor: "white",*/}
            {/*        borderRadius: 30,*/}
            {/*        padding: 15,*/}
            {/*        marginBottom: 20,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text style={{ color: "grey" }}>🔍 Search...</Text>*/}
            {/*</View>*/}

            {/*/!* Example Cards *!/*/}
            {/*<View*/}
            {/*    style={{*/}
            {/*        backgroundColor: "white",*/}
            {/*        borderRadius: 15,*/}
            {/*        padding: 20,*/}
            {/*        marginBottom: 15,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text style={{ fontWeight: "bold", fontSize: 18 }}>*/}
            {/*        CS2040 Notes*/}
            {/*    </Text>*/}

            {/*    <Text style={{ color: "grey", marginTop: 5 }}>*/}
            {/*        Algorithms and Data Structures*/}
            {/*    </Text>*/}
            {/*</View>*/}

            {/*<View*/}
            {/*    style={{*/}
            {/*        backgroundColor: "white",*/}
            {/*        borderRadius: 15,*/}
            {/*        padding: 20,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Text style={{ fontWeight: "bold", fontSize: 18 }}>*/}
            {/*        IS216 Cheatsheet*/}
            {/*    </Text>*/}

            {/*    <Text style={{ color: "grey", marginTop: 5 }}>*/}
            {/*        Software Product Management*/}
            {/*    </Text>*/}
            {/*</View>*/}

            <SearchScreen />

        </Screen>
    );
}






