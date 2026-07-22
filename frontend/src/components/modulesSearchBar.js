import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import {Colors, Radius, Spacing, Typography} from "@/theme/Index";

const SearchModules = ({ initialId, initialCodeName, onSelectModule }) => {
    const API_BASE = process.env.EXPO_PUBLIC_API_URL;

    const [modules, setModules] = useState([]);
    const [currentModID, setCurrentModID] = useState(initialId);
    const [currentModName, setCurrentModName] = useState(initialCodeName);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (initialId && initialCodeName) {
            setCurrentModID(initialId);
            setCurrentModName(initialCodeName);
            setModules([{ id: initialId, moduleName: initialCodeName }]);
        }
    }, [initialId, initialCodeName]);

    const searchData = (searchText) => {
        if (!searchText) {
            if (currentModID && currentModName) {
                setModules([{ id: currentModID, moduleName: currentModName }]);
            } else {
                setModules([]);
            }
            return;
        }

        fetch(`${API_BASE}/api/search/module?name=${searchText}`)
            .then(res => res.json())
            .then((mods) => {
                setModules(mods.map((m) => {
                        return {
                            id: m.id,
                            moduleName: `[${m.moduleCode}] ${m.moduleName}`
                        }
                    }

                ));
            })
            .catch((error) => {
                console.error("Error fetching modules:", error);
            });
    };

    return (
        <View >
            <Text style={styles.label}>Module Name</Text>
            <Dropdown
                style={[styles.input]}
                data={modules}
                search
                searchPlaceholder="Search for modules..."
                placeholder={!isFocus ? 'Select a module' : '...'}
                labelField="moduleName"
                valueField="id"
                value={currentModID}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={(searchQuery) => searchData(searchQuery)}
                onChange={(item) => {
                    setCurrentModID(item.id);
                    setCurrentModName(item.moduleName);
                    setIsFocus(false);
                    if (onSelectModule) {
                        onSelectModule(item);
                    }
                }}
                searchPlaceholderTextColor={Colors.text}
            />
        </View>
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
        height: 50,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        ...Typography.body,
    },
});

export default SearchModules;