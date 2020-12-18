import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import firebase from "../database/firebaseDB";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from "react-native-gifted-chat";

const auth = firebase.auth();

export default function ChatScreen({ navigation }) {

  const [messages, setMessages] = useState([]);

     // This is to set up the top right button
     useEffect(() => {
      //
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("Chat");
        } else {
          navigation.navigate("Login");
        }
      });

      navigation.setOptions({
//        need to remove headerLeft:
        headerRight: () => (
          <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons
              name= "logout"
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

      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ]);

      return unsubscribe;
    }, []);

  function logout() {
    auth.signOut();
//    navigation.navigate("Login");
  }    

  function clearMessage() {
    setMessages([]);
  }

  function submitMessage() {
    // Store message here
    setMessages([]);
  }

  return(
    <View style={styles.container}>
      <View style={{ paddingTop: 23, flex: 1, alignItems: "center", height: "80%" }}>
        <Text style={styles.label}>ChatScreen</Text>
        {/* Flatlist goes here */}
      </View>
      <View style={{ height: "20%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          placeholder="Enter message"
          style={styles.textInput}
          value={messages}
          onChangeText={(newMessages) => setMessages(newMessages)}
        >
        </TextInput>
        <TouchableOpacity onPress={clearMessage}>
          <MaterialIcons name="clear" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={submitMessage}>
          <MaterialIcons name="add-circle" size={50} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightgray",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontWeight: "bold",
      fontSize: 24,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "65%",
      height: 50,
      padding: 10,
      borderColor: "#ccc",
      backgroundColor: "white",
      borderRadius: 40,
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
  