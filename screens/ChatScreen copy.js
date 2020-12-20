import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
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
        refreshData("1"); // reload the date from the db and set state for id & name
        navigation.navigate("Chat");
      } else {
        navigation.navigate("Login");
      }
    });
    
    // This sets up the top right button
    navigation.setOptions({
      title: "Chat App",//(currentName),
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "black",
      },
      headerStyle: {
        height: 100,
        backgroundColor: "gray",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      },      
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
//          console.log("data");
//          console.log(data);
          const returnData = {
            ...doc.data(),
            createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
          };
          return returnData;
        });
        setMessages(serverMessages);
      });

    return () => {
      refreshData("2");
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  // This function call reload the data
  function refreshData(recInfo) {

    var serverMessages1 = ([]);

    console.log(recInfo);
    var user = auth.currentUser;
    if (user) {
      setCurrentID(user.uid);
      setCurrentName(user.email);
      console.log("Refresh!");
      console.log("ID:" + currentID);
      console.log("Name:" + currentName); 
      navigation.navigate("Chat");
    }else {
      console.log("Not refresh!");
      console.log("ID: is empty: " + currentID);
      console.log("Name: is empty: " + currentName);
      logout();  
    }

    db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        //const serverMessages = collectionSnapshot.docs.map((doc) => {
        serverMessages1 = collectionSnapshot.docs.map((doc) => {
          const data = doc.data();
          const returnData = {
            ...doc.data(),
            createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
          };
          return returnData;
        });
        setMessages(serverMessages1);
      });
  }

  function logout() {
    console.log("Signed out!");
    auth.signOut(); // this will set uid to null
  }

  function sendMessages(newMessages) {
    console.log("newMessages");
    console.log(newMessages);

    const newMessage = newMessages[0];
    db.add(newMessage);
    //setMessages([...newMessages, ...messages]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => sendMessages(messages)}      
//      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "lightgray",
        },
      }}
      user={{
//       _id: 1,
        _id: (currentID),
        name: (currentName),
      }}
    />
  );
}

