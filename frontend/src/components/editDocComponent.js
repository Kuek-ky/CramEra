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
    Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import SearchModules from './modulesSearchBar';
import { editDocumentDetails } from '@/api/editFileDetails';

const EditDocumentComponent = ({ fileId, ownerUserId }) => {
    const [originalData, setOriginalData] = useState({});

    const [moduleID, setModuleID] = useState(0);
    const [moduleName, setModuleName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetch('http://172.18.110.10:8080/document/getMetaData/module/' + fileId)
            .then(res => res.json())
            .then((json) => {
                setOriginalData(json);
                setTitle(json.title || '');
                setDescription(json.description || '');
                if (json.module) {
                    setModuleID(json.module.id);
                    setModuleName(json.module.moduleName);
                }
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

    const handleSave = () => {
        if (moduleID <= 0 || !title.trim()) {
            Alert.alert('Validation Error', 'Module and Title are required.');
            return;
        }

        console.log("modID:", moduleID);

        editDocumentDetails(fileId, file, ownerUserId,
            moduleID, title, description, "document")
            .then(res => {
                Alert.alert('Success', 'Document updated successfully!');
            })
            .catch(err => console.error("Error in saving!: ", err));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Edit Document</Text>

                <View style={{ marginBottom: 15 }}>
                    <SearchModules
                        initialId={moduleID}
                        initialName={moduleName}
                        onSelectModule={(selectedItem) => {
                            setModuleName(selectedItem.moduleName);
                            setModuleID(selectedItem.id);
                        }}
                    />
                </View>

                {/* Title Input */}
                <View style={{ marginBottom: 15 }}>
                    <Text>Document Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="e.g., Random Title"
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Description Input */}
                <View style={{ marginBottom: 15 }}>
                    <Text>Description</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description here..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* File Picker Section */}
                <View style={{ marginBottom: 20 }}>
                    <Text>Attach a New File?</Text>
                    <View style={styles.fileContainer}>
                        <Text numberOfLines={1} style={{ flex: 1, marginRight: 10 }}>
                            {file ? file.name : 'No file selected'}
                        </Text>
                        <TouchableOpacity onPress={handleFileSelect} style={styles.fileButton}>
                            <Text style={{ color: 'white' }}>{file ? 'Change File' : 'Upload File'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 5,
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
    },
    fileButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    }
});

export default EditDocumentComponent;