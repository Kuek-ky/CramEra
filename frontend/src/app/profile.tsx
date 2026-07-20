import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";
import Card from "@/components/common/Card";

import {
    Colors,
    Radius,
    Spacing,
    Typography,
} from "@/theme/Index";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PublicDocument = {
    documentId: number;
    title: string;
    description: string;
    fileType: string;
    createdAt: string;
    image: any;
};

const profilePlaceholder = require("../../assets/images/profile-placeholder.png");
const documentPlaceholder1 = require("../../assets/images/document-placeholder-1.png");
const documentPlaceholder2 = require("../../assets/images/document-placeholder-2.png");
const documentPlaceholder3 = require("../../assets/images/document-placeholder-3.png");

export default function Profile() {
    const [displayName, setDisplayName] = useState('');
    const [displayEmail, setDisplayEmail] = useState('');
    useEffect(() => {
        const getMultiple = async () => {
            try {
                // 1. Use multiGet with an array of keys
                const keyValuePairs = await AsyncStorage.multiGet(["userName", "userEmail"]);
                const data = Object.fromEntries(keyValuePairs);

                console.log(data);

                setDisplayName(data.userName ?? "Unknown User");
                // ?? -> If username is missing, return back "Unknown User"
                setDisplayEmail(data.userEmail ?? "No email found");
                // ?? -> If userEmail is missing, return back "No email found"

            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        getMultiple();
    }, []);

    const { showDocs } = useLocalSearchParams();
    const doesPrevPageShowDocs = showDocs === "true";

    const publicDocuments: PublicDocument[] = [
        {
            documentId: 1,
            title: "CS102 notes (all chapters)",
            description: "Intro to Java, programming fundamentals II",
            fileType: "PDF",
            createdAt: "6 July 2026",
            image: documentPlaceholder1,
        },
        {
            documentId: 2,
            title: "CS105 Cheatsheet",
            description: "Cheatsheet for topics 5 & 6",
            fileType: "PDF",
            createdAt: "13 June 2026",
            image: documentPlaceholder2,
        },
        {
            documentId: 3,
            title: "BQ Final tips",
            description: "Finals preparation summary for Big Questions.",
            fileType: "DOCX",
            createdAt: "24 June 2026",
            image: documentPlaceholder3,
        },
    ];

    const styles = StyleSheet.create({

        container: {
            paddingBottom: Spacing.xl,
        },

        profileCard: {
            alignItems: "center",
            marginBottom: Spacing.xl,
        },

        profileImage: {
            width: 90,
            height: 90,
            borderRadius: 45,
            marginBottom: Spacing.md,
        },

        username: {
            ...Typography.h2,
        },

        email: {
            ...Typography.body,
            color: Colors.textSecondary,
            marginTop: 4,
        },

        documentsSection: {
            width: "100%",
        },

        sectionTitle: {
            ...Typography.h3,
            marginBottom: Spacing.md,
        },

        documentCard: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Spacing.md,
        },

        documentImage: {
            width: 70,
            height: 70,
            borderRadius: Radius.md,
            marginRight: Spacing.md,
            backgroundColor: Colors.background,
        },

        documentInfo: {
            flex: 1,
        },

        documentTitle: {
            ...Typography.body,
            fontWeight: "700",
            marginBottom: 4,
        },

        documentDescription: {
            ...Typography.bodySmall,
            color: Colors.textSecondary,
            marginBottom: 4,
        },

        documentExtraDetails: {
            ...Typography.caption,
            color: Colors.textSecondary,
        },

        empty: {
            ...Typography.body,
            color: Colors.textSecondary,
            textAlign: "center",
            marginTop: Spacing.lg,
        },

    });

    return (
        <Screen>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            ></ScrollView>

            <Header
                title="Profile"
                subtitle="Manage your account"
            />

            <Card style={styles.profileCard}>
                <Image
                    source={profilePlaceholder}
                    style={styles.profileImage}
                />

                <Text style={styles.username}>{displayName}</Text>
                <Text style={styles.email}>{displayEmail}</Text>
            </Card>

            <View style={styles.documentsSection}>
                <Text style={styles.sectionTitle}>
                    Shared Documents
                </Text>

                {doesPrevPageShowDocs ? (
                    publicDocuments.map((document) => (
                        <Card
                            key={document.documentId}
                            style={styles.documentCard}
                        >
                            <Image
                                source={document.image}
                                style={styles.documentImage}
                            />

                            <View style={styles.documentInfo}>
                                <Text style={styles.documentTitle}>
                                    {document.title}
                                </Text>

                                <Text style={styles.documentDescription}>
                                    {document.description}
                                </Text>

                                <Text style={styles.documentExtraDetails}>
                                    {document.fileType} · {document.createdAt}
                                </Text>
                            </View>
                        </Card>
                    ))
                ) : (
                    <Text style={styles.empty}>
                        No documents uploaded yet.
                    </Text>
                )}
            </View>

        </Screen>
    );
}