import firebase from "../database/firebaseDB";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

//    const db = firebase.firestore().collection("todos");
const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


   // This is to set up the top right button
   useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => signUp()}>
          <AntDesign
            name="adduser"
            size= {40}
            color= "black"
            style= {{
              color: "black",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

    function signUp() {
      navigation.navigate("SignUp");
    }

    // Firestore successful will go to ChatScreen
    function login() {
      // Clear the input text and error message
      Keyboard.dismiss();
      setErrorMessage("");

      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
//          setEmail("");
//          setPassword("");
          console.log("Signed in!");
//          navigation.navigate("Chat", { email });
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage("Sign in Fail!");
        });
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
{/*                <Text style={styles.label}>Login</Text> */}
                <Text style={styles.labelText}>Email</Text>
                <View style={styles.textInputView}>
                  <TextInput
                      placeholder="Enter Email"
  //                    clearButtonMode= "always" // only for iOS
                      style={styles.textInput} autoCaptilize="none" autoCompleteType="email" keyboardType="email-address"
                      value={email}
                      onChangeText={(input) => setEmail(input)}
                  ></TextInput>
                  <TouchableOpacity onPress={() => setEmail("")}>
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={32}
                      color="gray"
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>                
                </View>
                <Text style={styles.labelText}>Password</Text>
                <View style={styles.textInputView}>
                  <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={true}
                      style={styles.textInput} autoCaptilize="none" autoCompleteType="password"
                      value={password}
                      onChangeText={(input) => setPassword(input)}
                  ></TextInput>
                  <TouchableOpacity onPress={() => setPassword("")}>
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={32}
                      color="gray"
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>                
                </View>
                <Text style={styles.errorText} >{errorMessage}</Text>
                <TouchableOpacity
                    onPress={login}
                    style={[styles.button, styles.submitButton]}
                    >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
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
      fontSize: 24,
      marginBottom: 30,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "60%",
      padding: 10,
      borderColor: "#ccc",
      marginRight: 6,
    },
    textInputView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',    
    },    
    buttons: {
      flexDirection: "row",
    },
    button: {
      width: 100,
      padding: 10,
      margin: 5,
      borderRadius: 10,
      marginTop: 0,
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
  