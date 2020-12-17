import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function gotoChatScreen() {
        setEmail("");
        setPassword("");
        navigation.navigate("Chat");
    }

    return(
        <View style={{ paddingTop: 23, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.label}>Login</Text>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
                placeholder="Enter Email"
                style={styles.textInput}
                value={email}
                onChangeText={(newEmail) => setEmail(newEmail)}
            ></TextInput>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
                placeholder="Enter Password"
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
            ></TextInput>
            <TouchableOpacity
                onPress={gotoChatScreen}
                style={[styles.button, styles.submitButton]}
                >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize: 24,
      marginBottom: 30,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "80%",
      padding: 10,
      borderColor: "#ccc",
    },
    buttons: {
      flexDirection: "row",
    },
    button: {
      width: 100,
      padding: 10,
      margin: 5,
      borderRadius: 10,
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
      textAlign: 'center',
    },
    submitButton: {
      backgroundColor: "blue",
    },
    cancelButton: {
      backgroundColor: "red",
    },
    labelText: {
        fontWeight: "bold",
        color: "black",
        textAlign: 'left',
      },
    });
  