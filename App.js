import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

function Home() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Home}
          options={{
            headerTitle: "Chat App",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,  
            },
            headerStyle: {
              height: 120,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',    
  },
});
