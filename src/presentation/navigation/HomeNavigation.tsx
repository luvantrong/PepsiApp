import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Test } from "../component/test";
import { NavigationContainer } from "@react-navigation/native";
import { SignUp, Rules } from "../container/sign-in";

type SignUpProps = {};
type TestProps = {};
type RulesProps = {};

export type HomeStackParamList = {
  SignUp: SignUpProps | undefined;
  Rules: RulesProps | undefined;
  Test: TestProps | undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const _HomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const _styles = StyleSheet.create({});
export const HomeNavigation = React.memo(_HomeNavigation);
