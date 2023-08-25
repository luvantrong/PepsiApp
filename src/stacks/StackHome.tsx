import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { NavigationContainer } from "@react-navigation/native";
type HomeProps = {};
type AboutProps = {};
type SettingProps = {};

export type StackParamList = {
  Home: HomeProps | undefined;
  About: AboutProps | undefined;
  Setting: SettingProps | undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: "About" }}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
