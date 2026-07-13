import { View, Text, StyleSheet, Pressable } from "react-native";
import { Document } from "../types/document";

interface Props{

    document:Document;

}

export default function DocumentCard({document}:Props){

    return(

        <Pressable style={styles.card}>

            <Text style={styles.module}>
                {document.module}
            </Text>

            <Text style={styles.title}>
                {document.title}
            </Text>

            <Text numberOfLines={2}>
                {document.description}
            </Text>

            <Text style={styles.author}>
                {document.author}
            </Text>

        </Pressable>

    )

}

const styles=StyleSheet.create({

    card:{

        backgroundColor:"white",

        padding:15,

        borderRadius:15,

        marginBottom:15,

        elevation:4

    },

    module:{

        fontWeight:"700",

        color:"#3b82f6"

    },

    title:{

        fontSize:20,

        fontWeight:"bold",

        marginVertical:6

    },

    author:{

        marginTop:8,

        color:"grey"

    }

})