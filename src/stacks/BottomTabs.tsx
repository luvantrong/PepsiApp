import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import StackHome from "./StackHome";
import StackSettings from "./StackSettings";
import Settings from "../screens/Settings";
import Home from "../screens/Home";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#52CC6D",
          tabBarInactiveTintColor: "#828282",

          tabBarStyle: {
            height: 100,
            paddingTop: 5,
          },

          tabBarLabel: ({ focused, color }) => {
            {
              if (route.name === "Trang chủ") {
                return (
                  <Text
                    style={{
                      color: focused ? "#52CC6D" : "#828282",
                      fontSize: 16,
                      fontWeight: "400",
                      marginTop: 5,
                    }}
                  >
                    Home
                  </Text>
                );
              } else if (route.name === "Settings") {
                return (
                  <Text
                    style={{
                      color: focused ? "#52CC6D" : "#828282",
                      fontSize: 16,
                      fontWeight: "400",
                      marginTop: 5,
                    }}
                  >
                    Settings
                  </Text>
                );
              }
            }
          },

          tabBarIconStyle: {
            marginBottom: -20,
          },
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Trang chủ") {
              return (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? "#52CC6D" : "#828282",
                  }}
                  source={require("../images/btHome.png")}
                />
              );
            } else if (route.name === "Settings") {
              return (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? "#52CC6D" : "#828282",
                    resizeMode: "stretch",
                  }}
                  source={require("../images/btPro.png")}
                />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Trang chủ" component={StackHome} />
        <Tab.Screen name="Settings" component={StackSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
