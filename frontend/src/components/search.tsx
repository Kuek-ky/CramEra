import { useMemo, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    Pressable, View,
} from "react-native";

interface Document {
    id: number;
    title: string;
    module: string;
    author: string;
}

export default function SearchScreen() {

    const API = "http://172.18.110.10:8080";

    const [search, setSearch] = useState("");

    
    const [documents, setDocuments] = useState<Document[]>([]);
    
    useEffect(() => {

        fetch(
            `${API}/document/search?name=${search}`
        )
            .then((res) => res.json())
            .then((data) => setDocuments(data))
            .catch((err) => console.error(err));

    }, [search]);

    // const documents: Document[] = [
    //     {
    //         id: 1,
    //         title: "Java Notes",
    //         module: "CS101",
    //         author: "John",
    //     },
    //     {
    //         id: 2,
    //         title: "HTML Cheatsheet",
    //         module: "IS113",
    //         author: "Sarah",
    //     },
    //     {
    //         id: 3,
    //         title: "React Native Guide",
    //         module: "CS303",
    //         author: "Alex",
    //     },
    //     {
    //         id: 4,
    //         title: "Database Notes",
    //         module: "IS216",
    //         author: "Bob",
    //     },
    // ];

    // const filtered = useMemo(() => {
    //     return documents.filter(
    //         (doc) =>
    //             doc.title.toLowerCase().includes(search.toLowerCase()) ||
    //             doc.module.toLowerCase().includes(search.toLowerCase()) ||
    //             doc.author.toLowerCase().includes(search.toLowerCase())
    //     );
    // }, [search]);

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Search</Text>

            <TextInput
                placeholder="Search documents..."
                style={styles.search}
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={documents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable style={styles.card}>

                        <Text style={styles.module}>
                            {item.module.moduleCode}
                        </Text>

                        <Text style={styles.title}>
                            {item.title}
                        </Text>

                        <Text style={styles.author}>
                            {item.author}
                        </Text>

                    </Pressable>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EEF4FF",
        padding: 20
    },

    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    },

    search: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 15,
        marginBottom: 20
    },

    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        elevation: 3
    },

    module: {
        color: "#4A7AFF",
        fontWeight: "600"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5
    },

    author: {
        color: "grey"
    }

});