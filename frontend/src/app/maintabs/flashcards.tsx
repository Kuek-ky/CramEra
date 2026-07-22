import { SafeAreaView } from 'react-native-safe-area-context';
import style from "../global-stylesheet"
import PlaceholderCard from "@/components/PlaceHolderCard";

export default function FlashcardsScreen() {
    return(
        <SafeAreaView style={style.container}>
            <PlaceholderCard/>
        </SafeAreaView>
    )
}
