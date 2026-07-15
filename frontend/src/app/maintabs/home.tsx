import {Text} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import style from "@/app/global-stylesheet";

export default function HomeScreen() {
    return(
        <SafeAreaView style={style.container}>
            <Text>This is a placeholder screen!</Text>
        </SafeAreaView>
    )
}
