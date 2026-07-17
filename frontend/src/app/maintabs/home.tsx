import { Text, Image, Pressable, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import globalStyles from "@/app/global-stylesheet";

const profilePic = require("../../../assets/images/profile-placeholder.png");

export default function HomeScreen() {
    const { userName, userEmail } = useLocalSearchParams();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.topSection}>
                <Text style={styles.header}>Explore</Text>

                <View style={styles.icons}>
                    <Pressable style={styles.notificationButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={26}
                            color="black"
                        />
                    </Pressable>

                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: "/profile",
                                params: {
                                    userName: userName ?? "",
                                    userEmail: userEmail ?? "",
                                    showDocs: "true",
                                },
                            })
                        }
                    >
                        <Image
                            source={profilePic}
                            style={styles.profileImage}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={styles.MOTDCard}>
                <Text style={styles.message}>
                    Let&apos;s make today productive!
                </Text>

                <Text style={styles.subtitle}>
                    Discover and share study materials with us.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    icons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    header: {
        fontSize: 25,
        fontWeight: "bold",
    },

    MOTDCard: {
        backgroundColor: "#DDEBFF",
        padding: 18,
        borderRadius: 15,
        marginBottom: 20,
    },

    message: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    subtitle: {
        marginTop: 5,
        color: "grey",
    },

    notificationButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
    },

    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
});