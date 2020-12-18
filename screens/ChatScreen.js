import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");
const auth = firebase.auth();

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    // This is the listener for authentication
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Chat");
        setCurrentID(firebase.auth().currentUser.uid);
        setCurrentName(firebase.auth().currentUser.email);
      } else {
        navigation.navigate("Login");
        setCurrentID("");
        setCurrentName("");
      }
    });
    // This sets up the top right button
    navigation.setOptions({
//      title: (currentName),
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={32}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });

    // This loads data from firebase
    const unsubscribeSnapshot = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const serverMessages = collectionSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          const returnData = {
            ...doc.data(),
            createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
          };
          return returnData;
        });
        setMessages(serverMessages);
      });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  function logout() {
    setCurrentID("");
    setCurrentName("");
    auth.signOut();
  }

  function sendMessages(newMessages) {
    console.log(newMessages);
    const newMessage = newMessages[0];
    db.add(newMessage);
    //setMessages([...newMessages, ...messages]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "#777",
        },
      }}
      user={{
        _id: currentID,
        name: currentName,
//       _id: 1,
      }}
    />
  );
}