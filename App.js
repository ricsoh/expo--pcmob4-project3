import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: "",
            headerTitle: "Chat App",
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
          }}
        />
        
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerLeft: "",
            headerTitle: "Chat App",
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
          }}
        />
  
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: "Chat App",
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
