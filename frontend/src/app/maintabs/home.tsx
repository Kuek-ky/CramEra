import { Image, Pressable, View, StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "@/components/common/screen";
import Header from "@/components/common/header";
import Card from "@/components/common/card";
import {Typography} from "@/theme/typography";

import SectionTitle from "@/components/common/SectionTitle";
import SearchBar from "@/components/search";
import DocumentCard from "@/components/document/DocumentCard";
import { useState } from "react";
import {Spacing} from "@/theme/spacing";
import {Radius} from "@/theme/radius";
import {Colors} from "@/theme/colors";

const profilePic = require("../../../assets/images/profile-placeholder.png");

export default function HomeScreen() {
    const { userName, userEmail } = useLocalSearchParams();

    const [search, setSearch] = useState("");


    return (
        <Screen>

            <Header
                title="Explore"
                subtitle="Welcome back"
                rightComponent={
                    <View style={styles.icons}>
                        <Pressable style={styles.notificationButton}>
                            {/*<Ionicons*/}
                            {/*    name="notifications-outline"*/}
                            {/*    size={24}*/}
                            {/*    color={Colors.text}*/}
                            {/*/>*/}
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

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <Card
                style={{
                    backgroundColor: Colors.primaryLight,
                    marginTop: Spacing.lg,
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

});

/*
ORI CODE
import { Text, Image, Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "@/components/common/screen";

const profilePic = require("../../../assets/images/profile-placeholder.png");

export default function HomeScreen() {
    const { userName, userEmail } = useLocalSearchParams();

    return (
        <Screen>
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
        </Screen>
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
*/
