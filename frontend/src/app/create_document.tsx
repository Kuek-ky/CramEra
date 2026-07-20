import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";

import {
    Colors,
    Radius,
    Spacing,
    Typography,
} from "@/theme/Index";

const API_BASE = "http://172.18.77.219:8080";
export default function CreateDocument() {

    // ===== State =====
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");

    // ===== Buttons =====

    // only for testin
    // const chooseFile = () => {
    //     // We'll replace this with the real document picker later
    //     setSelectedFile("lecture5.pdf");
    // };

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

        const document = {
            ownerUserID: 1,
            title,
            description,
            visibility,
            module: {
                id: 1
            }
        };

        const formData = new FormData();

        formData.append(
            "file",
            selectedFile.file,
            selectedFile.name
        );

        formData.append(
            "document",
            new Blob(
                [JSON.stringify(document)],
                {
                    type: "application/json"
                }
            )
        );

        console.log(selectedFile.file);
        console.log(formData.get("file"));

        const response = await fetch(`${API_BASE}/file/upload`, {
            method: "POST",
            body: formData,
        });

        const text = await response.text();

        console.log(text);

        Alert.alert(text);

        console.log(selectedFile.file.name);
        console.log(selectedFile.file.size);
        console.log(selectedFile.file.type);

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

            {/*<Pressable*/}
            {/*    style={{*/}
            {/*        backgroundColor: "red",*/}
            {/*        padding: 20,*/}
            {/*        marginTop: 20,*/}
            {/*    }}*/}
            {/*    onPress={uploadDocument}*/}
            {/*>*/}
            {/*    <Text style={{ color: "white" }}>*/}
            {/*        Upload*/}
            {/*    </Text>*/}
            {/*</Pressable>*/}

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