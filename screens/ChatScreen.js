import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

export default function ChatScreen({ navigation }) {
    return(
        <View style={{ paddingTop: 23, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.label}>ChatScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize: 24,
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
  