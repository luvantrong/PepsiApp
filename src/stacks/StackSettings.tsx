import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { NavigationContainer } from "@react-navigation/native";
import { StackParamList } from "./StackHome";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator<StackParamList>();

const StacSettings = () => {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Settings}
        options={{ title: "Setting" }}
      />
    </Stack.Navigator>
  );
};

export default StacSettings;
