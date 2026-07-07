import { Text, View, StyleSheet, Image} from "react-native";

type PublicDocument = {
    documentId: number;
    title: string;
    description: string;
    fileType: string;
    createdAt: string;
};

const profilePlaceholder = require("../../assets/images/profile-placeholder.png");

export default function Profile() {
    const user = {
        username: "Leon Kennedy",
        email: "LeonKennedy@hotman.com",
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            padding: 24,
            backgroundColor: "#F4F7FB",
        },
        pageTitle: {
            fontSize: 28,
            fontWeight: "600",
            marginBottom: 20,
        },
        profileCard:{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 24,
            marginBottom: 28,
            width: "100%",
            alignItems: "center"
        },
        username:{
            fontSize:24,
        },
        email:{
            fontSize:16,
            marginTop:4
        },
        profileImage:{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 16,
        }
    });

    return (
        <View style = {styles.container}>
            <Text style={styles.pageTitle}>
                Profile Page
            </Text>
            <View style={styles.profileCard}>
                <Image
                    source={profilePlaceholder}
                    style={styles.profileImage}
                />

                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
        </View>
    );
}