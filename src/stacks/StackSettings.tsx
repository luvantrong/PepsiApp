import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { NavigationContainer } from "@react-navigation/native";
import { StackParamList } from "./StackHome";

const Stack = createNativeStackNavigator<StackParamList>();

const StacSettings = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
};

export default StacSettings;
