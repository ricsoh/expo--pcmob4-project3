import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
{/*      <Stack.Navigator mode="modal"> */}
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: "Chat App",
            headerTitleAlign: "center",
            headerLeft: "", // hide back arrow on hearder
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
