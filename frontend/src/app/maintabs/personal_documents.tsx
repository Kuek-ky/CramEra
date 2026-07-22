import { useMemo, useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    Pressable,
} from "react-native";
import Screen from "@/components/common/Screen";
import {router, useFocusEffect} from "expo-router";
import {Colors} from "@/theme/Index";
import Header from "@/components/common/Header";
import SearchBar from "@/components/searchBar";
import Card from "@/components/common/Card";
import DocumentCard from "@/components/document/DocumentCard";
import {Document} from "@/types/document";
import {getStoredUserId} from "@/api/asyncStoreUser";

export default function PersonalScreen() {

    const [search, setSearch] = useState("");

    const [documents, setDocuments] = useState<Document[]>([]);
    const [numericUserId, setNumericUserId] =
        useState<number | null>(null);

    const filtered = useMemo(() => {

        return documents.filter(doc =>

            doc.title.toLowerCase().includes(search.toLowerCase())

        );

    }, [documents, search]);

    const API = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        async function loadUserId() {
            try {
                const storedUserId = await getStoredUserId();

                if (storedUserId === null) {
                    console.error("No stored user ID");
                    return;
                }

                setNumericUserId(Number(storedUserId));
            } catch (error) {
                console.error("Failed to load user ID:", error);
            }
        }

        loadUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (numericUserId === null) {
                return;
            }

            fetch(`${API}/savedDoc/${numericUserId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load saved documents");
                    }

                    return response.json();
                })
                .then(async (savedDocs) => {
                    const documentRequests = savedDocs.map(
                        (savedDoc: {
                            id: {
                                documentId: number;
                            };
                        }) =>
                            fetch(
                                `${API}/document/getMetaData/${savedDoc.id.documentId}`
                            ).then((response) => response.json())
                    );

                    const documentResults =
                        await Promise.all(documentRequests);

                    const formattedDocuments: Document[] =
                        documentResults.map((item) => ({
                            id: item.id,
                            title: item.title,
                            description: item.description ?? "",
                            module: item.module?.moduleCode ?? "",
                            author: item.author ?? "",
                            rating: item.rating ?? 0,
                            fileUrl: item.fileURL ?? "",
                            documentType: item.documentType ?? "",
                            saved: true,
                        }));

                    setDocuments(formattedDocuments);
                })
                .catch((error) => {
                    console.error(
                        "Failed to load saved documents:",
                        error
                    );
                });
        }, [numericUserId, API])
    );

    async function removeBookmark(documentId: number) {
        if (numericUserId === null) {
            return;
        }

        const response = await fetch(
            `${API}/savedDoc?userId=${numericUserId}&documentId=${documentId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            console.error("Failed to remove bookmark");
            return;
        }

        setDocuments((currentDocuments) =>
            currentDocuments.filter(
                (document) => document.id !== documentId
            )
        );
    }

    return (

        <Screen>

            <Header
                title="My Documents"
                subtitle="Manage your uploaded and saved notes"
            />

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <Card
                style={styles.folder}
            >

                <Text style={styles.folderTitle}>
                    Folders
                </Text>

                <Text style={styles.folderSubtitle}>
                    Coming Soon
                </Text>

            </Card>

            <FlatList

                data={filtered}

                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (

                    <DocumentCard
                        document={item}
                        onBookmarkPress={() => removeBookmark(item.id)}
                    />

                )}

            />

            <Pressable
                style={styles.createButton}
                onPress={() => {
                    router.push("/create_document")
                }}
            >
                <Text style={styles.plus}>+</Text>
            </Pressable>

        </Screen>

    );

}

const styles = StyleSheet.create({

    folder: {
        backgroundColor: "#DDEBFF",
        padding: 18,
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 20
    },

    folderTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },

    folderSubtitle: {
        marginTop: 5,
        color: "grey"
    },

    createButton: {
        position: "absolute",
        right: 25,
        bottom: 100,
        width: 70,
        height: 70,
        borderRadius: 36,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },

    plus: {
        fontSize: 40,
        lineHeight: 42,
        color: Colors.primary,
        fontWeight: "300",
    },
});