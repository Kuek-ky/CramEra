import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import globalStyles from "@/app/global-stylesheet";

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

    const { userName, userEmail, showDocs } = useLocalSearchParams();
    const displayName = userName ?? "Unknown User";
    // ?? -> If username is missing, return back "Unknown User"
    const displayEmail = userEmail ?? "No email found";
    // ?? -> If userEmail is missing, return back "No email found"
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
            alignItems: "center",
        },
        pageTitle: {
            fontSize: 28,
            fontWeight: "600",
            marginBottom: 20,
        },
        profileCard:{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 24,
            marginBottom: 28,
            width: "100%",
            alignItems: "center"
        },
        username:{
            fontSize:24,
        },
        email:{
            fontSize:16,
            marginTop:4,
            color: "#4B5563",
        },
        profileImage:{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 16,
        },
        documentsSection: {
            width: "100%",
        },
        sectionTitle: {
            fontSize: 22,
            fontWeight: "500",
            color: "#111827",
            marginBottom: 12,
        },
        documentCard: {
            width: "100%",
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
        },
        documentImage: {
            width: 70,
            height: 70,
            borderRadius: 35,
            marginRight: 14,
            backgroundColor: "#E5E7EB",
        },
        documentInfo: {
            flex: 1,
        },
        documentTitle: {
            fontSize: 16,
            fontWeight: "500",
            color: "#111827",
            marginBottom: 4,
        },
        documentDescription: {
            fontSize: 14,
            color: "#4B5563",
            marginBottom: 4,
        },
        documentExtraDetails: {
            fontSize: 12,
            color: "#9CA3AF",
        },
    });

    return (
        <ScrollView
            contentContainerStyle={[
                globalStyles.container,
                styles.container,
            ]}
        >
            <Text style={styles.pageTitle}>
                Profile Page
            </Text>
            <View style={styles.profileCard}>
                <Image
                    source={profilePlaceholder}
                    style={styles.profileImage}
                />

                <Text style={styles.username}>{displayName}</Text>
                <Text style={styles.email}>{displayEmail}</Text>
            </View>

            <View style={styles.documentsSection}>
                <Text style={styles.sectionTitle}>Public Documents</Text>

                {doesPrevPageShowDocs ? (
                    publicDocuments.map((document) => (
                        <View key={document.documentId} style={styles.documentCard}>
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
                        </View>
                    ))
                ) : (
                    <Text> No documents uploaded yet. </Text>
                )}
            </View>

        </ScrollView>
    );
}