import { TextInput, StyleSheet } from "react-native";

interface Props{

    value:string;

    onChange:(text:string)=>void;

}

export default function SearchBar({value,onChange}:Props){

    return(

        <TextInput

            style={styles.search}

            placeholder="Search..."

            value={value}

            onChangeText={onChange}

        />

    )

}

const styles=StyleSheet.create({

    search:{

        backgroundColor:"white",

        padding:12,

        borderRadius:30,

        marginVertical:15,

        borderWidth:1,

        borderColor:"#ddd"

    }

})