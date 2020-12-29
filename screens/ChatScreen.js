import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");
const auth = firebase.auth();

export default function ChatScreen({ navigation }) { 
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {

    // ********************************************************************
    // This is the listener for authentication and redirect to login or chat screen
    // ********************************************************************
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (user) {
        refreshData();
//        navigation.navigate("Chat");
      } else {
        navigation.navigate("Login");
      }
    });
{/*
    // This loads data from firebase
    const unsubscribeSnapshot = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const serverMessages = collectionSnapshot.docs.map((doc) => {
          const data = doc.data();
//          console.log(data);
          const returnData = {
            ...doc.data(),
            createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
          };
          return returnData;
        });
        console.log("unsubscribeSnapshot: " + serverMessages);
        setMessages(serverMessages);
      });
*/}
    // ********************************************************************
    // This sets up the top right logout button
    // ********************************************************************
    navigation.setOptions(
      {
//      headerTitle: {setCurrentUserName},
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
    return () => {
      unsubscribeAuth();
//      unsubscribeSnapshot();
    };
  }, []);

  // ********************************************************************
  // Reload data from DB and refresh the chat screen
  // ********************************************************************
  function refreshData() {

    db
    .orderBy("createdAt", "desc")
    .onSnapshot((collectionSnapshot) => {
      const serverMessages = collectionSnapshot.docs.map((doc) => {
        const data = doc.data();
        const returnData = {
          ...doc.data(),
          createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
        };
        return returnData;
      });
      setMessages(serverMessages);
    });
  }
  
  // ********************************************************************
  // When signed out, the login state chnage and listener will direct back to login screen
  // ********************************************************************
  function logout() {
    auth.signOut();
  }

  // ********************************************************************
  // This will add the new message to the db and also refresh the chat screen
  // ********************************************************************
  function sendMessages(newMessages) {
    const newMessage = newMessages[0];
    db.add(newMessage);
//    setMessages([...newMessages, ...messages]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "lightgray",
        },
      }}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.email,
      }}
    />
  );
}