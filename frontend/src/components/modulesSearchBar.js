import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const SearchModules = ({ initialId, initialName, onSelectModule }) => {
    const [modules, setModules] = useState([]);
    const [currentModID, setCurrentModID] = useState(initialId);
    const [currentModName, setCurrentModName] = useState(initialName);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (initialId && initialName) {
            setCurrentModID(initialId);
            setCurrentModName(initialName);
            setModules([{ id: initialId, moduleName: initialName }]);
        }

        console.log("setCurrentModID:", initialId);
        console.log("setCurrentModName:", initialName);

    }, [initialId, initialName]);

    const searchData = (searchText) => {
        if (!searchText) {
            if (currentModID && currentModName) {
                setModules([{ id: currentModID, moduleName: currentModName }]);
            } else {
                setModules([]);
            }
            return;
        }

        fetch(`http://172.18.110.10:8080/api/search/module?name=${searchText}`)
            .then(res => res.json())
            .then((mods) => {
                setModules(mods);
            })
            .catch((error) => {
                console.error("Error fetching modules:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Module Name</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
                    console.log("item->", item);
                    setCurrentModID(item.id);
                    setCurrentModName(item.moduleName);
                    setIsFocus(false);
                    if (onSelectModule) {
                        onSelectModule(item);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default SearchModules;