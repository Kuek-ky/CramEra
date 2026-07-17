import { useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    View,
    Pressable,
} from "react-native";
import Screen from "@/components/common/Screen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";



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
                onPress={() => router.push("/create_document")}
            >
                <Ionicons
                    name="add"
                    size={34}
                    color="#4A7AFF"
                />
            </Pressable>

        </Screen>

    );

}

const styles = StyleSheet.create({

    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    },

    search: {
        backgroundColor: Colors.surface,
        borderRadius: 30,
        padding: 15,
        marginBottom: 20
    },

    folder: {
        backgroundColor: "#DDEBFF",
        padding: 18,
        borderRadius: 15,
        marginBottom: 20
    },

    folderTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },

    folderSubtitle: {
        marginTop: 5,
        color: "grey"
    },

    card: {
        backgroundColor: Colors.surface,
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3
    },

    module: {
        color: Colors.primary,
        fontWeight: "600"
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 5
    },

    type: {
        color: "grey"
    },

    createButton: {
        position: "absolute",
        right: 25,
        bottom: 40,
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
});