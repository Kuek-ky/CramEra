import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import SearchModules from '../components/modulesSearchBar';
import {getStoredUserId} from "@/api/asyncStoreUser";

import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";

import {
    Colors,
    Radius,
    Spacing,
    Typography,
} from "@/theme/Index";
import {router} from "expo-router";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
export default function CreateDocument() {

    // ===== State =====
    const [moduleID, setModuleID] = useState(0);
    const [moduleName, setModuleName] = useState('');
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");

    // ===== Buttons =====

    const chooseFile = async () => {

        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });

        console.log(result);

        if (!result.canceled) {
            console.log(result.assets[0]);
            setSelectedFile(result.assets[0]);

        }

    };

    const uploadDocument = async () => {

        if (!selectedFile) {
            alert("No file");
            return;
        }

        if (!title.trim()) {
            alert("No title");
            return;
        }
        const userId = await getStoredUserId();

        const document = {
            "ownerUserID": parseInt(userId || "1", 10),
            "module": {"id":moduleID},
            "title": title,
            "description": description,
            "visibility": visibility
        }

        const formData = new FormData();

        formData.append("file", {
            uri: selectedFile.uri,
            name: selectedFile.name,
            type: selectedFile.mimeType
        } as any);

        formData.append(
            "document", JSON.stringify(document)
        );

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_BASE}/file/upload`);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("Upload success:", xhr.responseText);
                Alert.alert("Success", "Document uploaded successfully!");
                router.replace({
                    pathname: "/maintabs/home"
                })
            } else {
                console.error(`Backend error (${xhr.status}):`, xhr.responseText);
                Alert.alert("Upload Failed", `Server Error: ${xhr.responseText}`);
            }
        };

        xhr.onerror = () => {
            console.error("Network request failed");
            Alert.alert("Network Error", "Could not connect to the server. Please check your connection.");
        };

        xhr.send(formData);


    };


    return (
        <Screen>

            <Header
                title="Create Document"
                subtitle="Upload and share your study materials"
            />

            {/* Choose File */}

            <Pressable
                style={styles.button}
                onPress={chooseFile}
            >
                <Text style={styles.buttonText}>
                    Choose File
                </Text>
            </Pressable>

            <Text style={styles.fileText}>
                {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : "No file selected"}
            </Text>

            {/* Title */}

            <Text style={styles.label}>
                Title
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter title..."
                value={title}
                onChangeText={setTitle}
            />

            {/* Module Select */}
            <View style={{ marginBottom: 15 }}>
                <SearchModules
                    initialId={moduleID}
                    initialCodeName={moduleName}
                    onSelectModule={(selectedItem) => {
                        setModuleName(selectedItem.moduleName);
                        setModuleID(selectedItem.id);
                    }}
                />
            </View>

            {/* Description */}

            <Text style={styles.label}>
                Description
            </Text>

            <TextInput
                style={[styles.input, styles.description]}
                placeholder="Enter description..."
                value={description}
                onChangeText={setDescription}
                multiline
            />

            {/* Visibility */}

            <Text style={styles.label}>
                Visibility
            </Text>

            <View style={styles.visibilityRow}>

                <Pressable
                    style={[
                        styles.visibilityButton,
                        visibility === "public" && styles.selected
                    ]}
                    onPress={() => setVisibility("public")}
                >
                    <Text
                        style={{
                            color:
                                visibility === "public"
                                    ? Colors.primary
                                    : Colors.text,
                        }}
                    >
                        Public
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.visibilityButton,
                        visibility === "private" && styles.selected
                    ]}
                    onPress={() => setVisibility("private")}
                >
                    <Text
                        style={{
                            color:
                                visibility === "private"
                                    ? Colors.primary
                                    : Colors.text,
                        }}
                    >
                        Private
                    </Text>
                </Pressable>

            </View>

            {/* Upload */}
            <Pressable
                style={styles.uploadButton}
                onPress={uploadDocument}
            >
                <Text style={{ color: "white" }}>
                    Upload
                </Text>
            </Pressable>

        </Screen>
    );
}

const styles = StyleSheet.create({

    label: {
        ...Typography.body,
        fontWeight: "600",
        marginTop: Spacing.lg,
        marginBottom: Spacing.xs,
        color: Colors.text,
    },

    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        ...Typography.body,
    },

    description: {
        height: 120,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: Radius.md,
        alignItems: "center",
        marginTop: Spacing.md,
    },

    uploadButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: Radius.md,
        alignItems: "center",
        marginTop: Spacing.xl,
    },

    buttonText: {
        ...Typography.button,
        color: Colors.white,
    },

    fileText: {
        marginTop: Spacing.sm,
        color: Colors.textSecondary,
        ...Typography.bodySmall,
    },

    visibilityRow: {
        flexDirection: "row",
        gap: Spacing.md,
        marginTop: Spacing.sm,
    },

    visibilityButton: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingVertical: Spacing.md,
        alignItems: "center",
    },

    selected: {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
    },

});