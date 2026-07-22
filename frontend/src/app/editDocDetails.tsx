import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform, Pressable, ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import SearchModules from '../components/modulesSearchBar';
import { editDocumentDetails } from '@/services/editFileDetails';
import {router, useLocalSearchParams} from "expo-router";
import {getStoredUserId} from "@/services/asyncStoreUser";
import {Colors, Radius, Spacing, Typography} from "@/theme/Index";
import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";

const EditDocumentScreen = () => {
    const API_BASE = process.env.EXPO_PUBLIC_API_URL;

    const { fileId } = useLocalSearchParams();
    const [originalData, setOriginalData] = useState({});

    const [moduleID, setModuleID] = useState(0);
    const [moduleName, setModuleName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(fileId || null);
    const [visibility, setVisibility] = useState("public");

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/document/getMetaData/${fileId}`)
            .then(res => res.json())
            .then((json) => {
                setOriginalData(json);
                setTitle(json.title || '');
                setDescription(json.description || '');
                if (json.module) {
                    setModuleID(json.module.id);
                    setModuleName(`[${json.module.moduleCode}] ${json.module.moduleName}`);
                }
                setVisibility(json.visibility || "public");
            })
            .catch(err => {
                console.error("Error fetching metadata:", err);
            });
    }, [fileId]);

    const handleFileSelect = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFile(result.assets[0]);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick a document.');
            console.error(error);
        }
    };

    const handleSave = async () => {
        if (!file) {
            setLoading(false);
            alert("File is required");
            return;
        }

        if (!title.trim()) {
            setLoading(false);
            alert("Title is required");
            return;
        }

        if (moduleID <= 0 || !moduleID) {
            setLoading(false);
            alert("Module is required");
            return;
        }
        setLoading(true);
        const userId = await getStoredUserId();

        editDocumentDetails(API_BASE, fileId, file, userId,
            moduleID, title, description,
            "document", visibility)
            .then(res => {
                Alert.alert('Success', 'Document updated successfully!');
                setLoading(false);
                router.replace({
                    pathname: "/maintabs/home"
                })
            })
            .catch(err => {
                console.error("Error in saving!: ", err);
                setLoading(false);
            });
    };

    return (
        <Screen>
            <Header
                title="Edit Document"
                subtitle="Edit your study material details"
            />

            {/* File Picker Section */}
            <Pressable onPress={handleFileSelect} style={styles.button}>
                <Text style={styles.buttonText}>Choose File</Text>
            </Pressable>
            <Text style={styles.fileText}>
                {file
                    ? `Selected: ${file.name || "None"}`
                    : "No file selected"}
            </Text>

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

            {/* Title Input */}
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>Document Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g., Random Title"
                    placeholderTextColor="#999"
                />
            </View>

            {/* Description Input */}
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.description]}
                placeholder="Enter description..."
                value={description}
                onChangeText={setDescription}
                multiline
            />

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

            {/* Save Button */}
            <Pressable
                disabled={isLoading}
                onPress={handleSave}
                style={styles.uploadButton}
            >{
                isLoading ?
                    <ActivityIndicator size={'small'} color={'white'} />
                    :
                    <Text style={{color: "white"}}>
                        Update Document
                    </Text>
            }
            </Pressable>
        </Screen>
    );
};

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

export default EditDocumentScreen;