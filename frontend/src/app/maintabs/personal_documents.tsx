import { useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    Pressable,
} from "react-native";
import Screen from "@/components/common/Screen";
import {router, useLocalSearchParams} from "expo-router";
import { Colors } from "@/theme/Index";
import Header from "@/components/common/Header";
import SearchBar from "@/components/searchBar";
import Card from "@/components/common/Card";
import DocumentCard from "@/components/document/DocumentCard";
import {getStoredUserId} from "@/api/asyncStoreUser";

interface Document {
    id: number;
    title: string;
    module: string;
    type: string;
}

export default function PersonalScreen() {

    const [search, setSearch] = useState("");

    const documents: Document[] = [

        {
            id: 1,
            title: "Week 5 Java Notes",
            module: "CS101",
            type: "Created"
        },

        {
            id: 2,
            title: "Database Cheatsheet",
            module: "IS216",
            type: "Created"
        },

        {
            id: 3,
            title: "React Native Guide",
            module: "CS303",
            type: "Saved"
        },

        {
            id: 4,
            title: "Operating Systems",
            module: "CS204",
            type: "Saved"
        }

    ];

    const filtered = useMemo(() => {

        return documents.filter(doc =>

            doc.title.toLowerCase().includes(search.toLowerCase())

        );

    }, [search]);

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
                        document={{
                            module: item.module,
                            title: item.title,
                            description: item.type,
                            author: "",
                        }}
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