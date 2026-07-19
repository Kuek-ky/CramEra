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
        <View style={styles.container}>

            <Text style={styles.heading}>
                Create Document
            </Text>

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
                {selectedFile ? selectedFile.name : "No file selected"}
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
                    <Text>Public</Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.visibilityButton,
                        visibility === "private" && styles.selected
                    ]}
                    onPress={() => setVisibility("private")}
                >
                    <Text>Private</Text>
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
                style={{
                    backgroundColor: "red",
                    padding: 20,
                    marginTop: 20,
                }}
                onPress={uploadDocument}
            >
                <Text style={{ color: "white" }}>
                    Upload
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },

    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },

    label: {
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
    },

    input: {
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 8,
        padding: 10,
    },

    description: {
        height: 120,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },

    uploadButton: {
        backgroundColor: "#2196F3",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 100,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
    },

    fileText: {
        marginTop: 10,
        marginBottom: 10,
    },

    visibilityRow: {
        flexDirection: "row",
        gap: 10,
    },

    visibilityButton: {
        flex: 1,
        borderWidth: 1,
        padding: 12,
        alignItems: "center",
        borderRadius: 8,
    },

    selected: {
        backgroundColor: "#BDE5FF",
    },

});