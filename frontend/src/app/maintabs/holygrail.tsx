import {useEffect, useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import style from "@/app/global-stylesheet";
import SearchScreen from "@/components/search"

const API_BASE = "http://172.18.77.219:8080"; //ip address to come from your wsl container, NOT YOUR LOCAL MACHINE

/*
* Am testing out some code by making a default landing page
* have commented out the pages loaded in by the Expo app
*/
export default function Landing() {
    const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
    const [message, setMessage] = useState("");
    return (
        <SafeAreaView style={style.container}>
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
                    backgroundColor: "grey",
                    borderRadius: 30,
                    marginBottom: 20,
                    position:"relative",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#b6b6ff"
                }}
            >
                <View style={{
                    backgroundColor: "white",
                    padding: 7,
                    borderRadius: 30,
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
                        color: "white",
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

            <SearchScreen/>

        </SafeAreaView>
    );
}



