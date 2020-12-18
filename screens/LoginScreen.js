import firebase from "../database/firebaseDB";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";

//    const db = firebase.firestore().collection("todos");
const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Firestore successful will go to ChatScreen
    function login() {
      // Clear the input text and error message
      Keyboard.dismiss();
      setErrorMessage("");

      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("Signed in!");
          navigation.navigate("Chat", { email });
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage("Signed Fail!");
        });
    }

    function gotoChatScreen() {
        setEmail("");
        setPassword("");
        navigation.navigate("Chat");
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.label}>Login</Text>
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                    placeholder="Enter Email"
                    style={styles.textInput} autoCaptilize="none" autoCompleteType="email" keyboardType="email-address"
                    value={email}
                    onChangeText={(input) => setEmail(input)}
                ></TextInput>
                <Text style={styles.labelText}>Password</Text>
                <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    style={styles.textInput} autoCaptilize="none" autoCompleteType="password"
                    value={password}
                    onChangeText={(input) => setPassword(input)}
                ></TextInput>
                <TouchableOpacity
                    onPress={login}
                    style={[styles.button, styles.submitButton]}
                    >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.errorText} >{errorMessage}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 24,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontWeight: "bold",
      fontSize: 36,
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
      fontSize: 18,
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
    errorText: {
        color: "red",
        height: 40,
      },
    });
  