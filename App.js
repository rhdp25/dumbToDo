import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import AddToDo from "./screens/AddToDo";
import EditToDo from "./screens/EditToDo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTodo" component={AddToDo} />
        <Stack.Screen name="Edit" component={EditToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
