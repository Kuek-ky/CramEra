import {Text, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import style from "../global-stylesheet"

export default function FlashcardsScreen() {
    return(
        <SafeAreaView style={style.container}>
            <Text>This is a placeholder screen!</Text>
        </SafeAreaView>
    )
}
