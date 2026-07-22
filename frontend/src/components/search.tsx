import {Document} from "@/types/document"
import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import Header from "@/components/common/Header";
import SearchBar from "@/components/searchBar";
import DocumentCard from "@/components/document/DocumentCard";
import { getStoredUserId } from "@/services/asyncStoreUser";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

interface SearchResult {
    id: number;
    title: string;
    description: string;
    module: {
        moduleCode: string;
    } | null;
    author: string;
    rating?: number;
    fileUrl?: string;
    documentType?: string;
}

export default function SearchScreen() {
    const [numericUserId, setNumericUserId] =
        useState<number | null>(null);

    const API_BASE = process.env.EXPO_PUBLIC_API_URL;

    const [search, setSearch] = useState("");

    const [documents, setDocuments] = useState<Document[]>([]);

    const [savedDocumentIds, setSavedDocumentIds] = useState<number[]>([]);

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
                console.error("Failed to get user ID:", error);
            }
        }

        loadUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (numericUserId === null) {
                return;
            }

            fetch(`${API_BASE}/savedDoc/${numericUserId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to load saved documents");
                    }

                    return res.json();
                })
                .then((savedDocs) => {
                    const ids = savedDocs.map(
                        (savedDoc: {
                            id: {
                                documentId: number;
                            };
                        }) => savedDoc.id.documentId
                    );

                    setSavedDocumentIds(ids);
                })
                .catch((err) => {
                    console.error("Failed to load saved documents:", err);
                });
        }, [numericUserId, API_BASE])
    );

    async function toggleBookmark(document: Document) {
        if (numericUserId === null) {
            console.error("User ID has not loaded yet");
            return;
        }

        try {
            let response: Response;

            if (document.saved) {
                response = await fetch(
                    `${API_BASE}/savedDoc?userId=${numericUserId}&documentId=${document.id}`,
                    {
                        method: "DELETE",
                    }
                );
            } else {
                response = await fetch(
                    `${API_BASE}/savedDoc/save`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: {
                                documentId: document.id,
                                userId: numericUserId,
                            },
                            folderId: null,
                        }),
                    }
                );
            }

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            setSavedDocumentIds((currentIds) =>
                document.saved
                    ? currentIds.filter((id) => id !== document.id)
                    : [...currentIds, document.id]
            );

            setDocuments((currentDocuments) =>
                currentDocuments.map((currentDocument) => {
                    if (currentDocument.id === document.id) {
                        return {
                            ...currentDocument,
                            saved: !currentDocument.saved,
                        };
                    }

                    return currentDocument;
                })
            );
        } catch (error) {
            console.error("Bookmark failed:", error);
        }
    }

    useEffect(() => {
        fetch(
            `${API_BASE}/document/search?name=${encodeURIComponent(search)}`
        )
            .then((res) => res.json())
            .then((data: SearchResult[]) => {
                const formattedDocuments: Document[] = data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    module: item.module?.moduleCode ?? "",
                    author: item.author ?? "",
                    rating: item.rating ?? 0,
                    fileUrl: item.fileUrl ?? "",
                    documentType: item.documentType ?? "",
                    saved: savedDocumentIds.includes(item.id),
                }));
                setDocuments(formattedDocuments);
            })
            .catch((err) => console.error(err));

    }, [search, savedDocumentIds, API_BASE]);

    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ marginTop: -30 }}>
                <SearchBar
                    value={search}
                    onChange={setSearch}
                />
            </View>

            <FlatList
                data={documents}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: 120,
                }}
                renderItem={({ item }) => (
                    <DocumentCard
                        document={item}
                        onBookmarkPress={() => toggleBookmark(item)}
                    />
                )}
            />

        </View>
    );
}