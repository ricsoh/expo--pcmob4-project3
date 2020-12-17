import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen({ navigation }) {

  const [messages, setMessages] = useState([]);

  function clearMessage() {
    setMessages([]);
  }

  function submitMessage() {
    setMessages([]);
  }

  return(
    <View style={styles.container}>
      <View style={{ paddingTop: 23, flex: 1, alignItems: "center", height: "80%" }}>
        <Text style={styles.label}>ChatScreen</Text>
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
  