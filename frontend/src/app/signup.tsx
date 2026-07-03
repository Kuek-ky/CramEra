// import { useState } from "react";
// import { Button, Text, TextInput, View } from "react-native";
//
// const API_BASE = "http://172.18.77.219:8080"; //ip address to come from your wsl container, NOT YOUR LOCAL MACHINE
//
// export default function SignUp(){
//     const [userName, setUserName] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//
//     function submitButton(){
//         console.log("Sending user to backend");
//
//         const response = await fetch(`${API_BASE}/api/users`, {
//             method: "POST",
//             headers:{"Content-Type":"application/json",},
//             body: JSON.stringify({
//                 userName: userName,
//                 userEmail: userEmail,
//             }),
//         });
//         const result = await response.text();
//         console.log("Backend response:", result);
//     }
//
//     return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
//             <Text style={{ fontSize: 28, fontWeight: "600" }}>Sign Up</Text>
//             <TextInput
//                 placeholder="Username"
//                 value = {userName}
//                 onChangeText={setUserName}
//                 style={{borderWidth: 1, marginTop:12, padding: 8}}/>
//             <TextInput
//                 placeholder="Email"
//                 value = {userEmail}
//                 onChangeText={setUserEmail}
//                 style={{borderWidth: 1, marginTop:12, padding: 8}}/>
//
//             <Button title = "Sign Up" onPress={submitButton} />
//         </View>
//     )
// }