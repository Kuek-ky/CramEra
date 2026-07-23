import { SafeAreaView } from 'react-native-safe-area-context';
import PdfViewer from "./pdf_viewer";
import {useLocalSearchParams} from "expo-router";
import style from "./global-stylesheet";
import {Alert} from "react-native";

export default function viewDocScreen() {
    const { fileId } = useLocalSearchParams();
    Alert.alert('Warning', 'This document viewer only works in android 8 or lower since we were not able to obtain a valid SSL certificate');

    return(
        <SafeAreaView style={style.container}>
            <PdfViewer fileId={fileId} onLoaded={1}/>
        </SafeAreaView>
    )
}
