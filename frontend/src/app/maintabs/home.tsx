import { Image, Pressable, View, StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";
import Card from "@/components/common/Card";
import SearchScreen from "@/components/search";

import {
    Colors,
    Spacing,
    Radius,
    Typography,
} from "@/theme/Index";


const profilePic = require("../../../assets/images/profile-placeholder.png");
const notificationBell = require("../../../assets/images/notification-icon.png");

export default function HomeScreen() {
    const { userName, userEmail } = useLocalSearchParams();

    return (
        <Screen>

            <Header
                title="Explore"
                subtitle="Welcome back"
                rightComponent={
                    <View style={styles.icons}>
                        <Pressable style={styles.notificationButton}>
                            <Image
                                source={notificationBell}
                                style={styles.notification}
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
                }
            />
            <Card
                style={{
                    backgroundColor: Colors.primaryLight,
                    marginTop: Spacing.sm,
                }}
            >
                <Text style={Typography.h3}>
                    Let's make today productive! 📚
                </Text>

                <Text
                    style={[
                        Typography.bodySmall,
                        {
                            marginTop: Spacing.sm,
                        },
                    ]}
                >
                    Discover, organise and share study materials with your classmates.
                </Text>
            </Card>
            <SearchScreen />



            <View
                style={{
                    marginTop: Spacing.xl,
                }}
            >
                {/* <SectionTitle title="Recent Documents" />

                <View
                    style={{
                        marginTop: Spacing.md,
                    }}
                >
                    {recentDocuments.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                        />
                    ))}
                </View> */}
            </View>

        </Screen>
    );
}

const styles = StyleSheet.create({

    icons: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm,
    },

    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: Radius.pill,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.surface,
    },

    profileImage: {
        width: 48,
        height: 48,
        borderRadius: Radius.pill,
    },

    notification: {
        width: 26,
        height: 26,
        resizeMode: "contain",
    },

});