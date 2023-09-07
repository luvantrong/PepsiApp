import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Test } from "../component/test";
import { NavigationContainer } from "@react-navigation/native";
import { SignUp, Rules, ConfirmOTP, SignIn } from "../container/sign-in";
import { Home, Instruct } from "../container/home";

type SignUpProps = {};
type TestProps = {};
type RulesProps = {};
type ConfirmOTPProps = {};
type HomeProps = {};
type SignInProps = {};
type InstructProps = {};

export type HomeStackParamList = {
  SignUp: SignUpProps | undefined;
  Rules: RulesProps | undefined;
  Test: TestProps | undefined;
  ConfirmOTP: ConfirmOTPProps | undefined;
  Home: HomeProps | undefined;
  SignIn: SignInProps | undefined;
  Instruct: InstructProps | undefined;
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
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Instruct" component={Instruct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const _styles = StyleSheet.create({});
export const HomeNavigation = React.memo(_HomeNavigation);
