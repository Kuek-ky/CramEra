import { useMemo, useState, useEffect } from "react";
import {
    FlatList,
    View,
} from "react-native";

import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import DocumentCard from "@/components/document/DocumentCard";

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

    return (
        <Screen>

            <Header
                title="Search"
                subtitle="Find study materials"
            />

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <FlatList
                data={documents}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: 120,
                }}
                renderItem={({ item }) => (
                    <DocumentCard
                        document={{
                            module: item.module.moduleCode,
                            title: item.title,
                            description: item.description,
                            author: item.author,
                        }}
                    />
                )}
            />

        </Screen>
    );
}