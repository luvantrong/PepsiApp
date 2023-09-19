import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignUp, Rules, ConfirmOTP, SignIn } from "../container/sign-in";
import {
  Home,
  Instruct,
  Play,
  HappyPresent,
  ScanQR,
  Collection,
  DetailGift,
} from "../container/home";

type SignUpProps = {};
type RulesProps = {};
type ConfirmOTPProps = {
  phoneNumber: string | undefined;
  type: boolean;
  name?: string;
};
type HomeProps = {};
type SignInProps = {};
type InstructProps = {};
type PlayProps = {
  type: boolean;
  sumPlay: string;
};
type HappyPresentProps = {
  type: boolean | undefined;
};
type ScanQRProps = {};
type CollectionProps = {};
type DetailGiftProps = {};

export type HomeStackParamList = {
  SignUp: SignUpProps | undefined;
  Rules: RulesProps | undefined;
  ConfirmOTP: ConfirmOTPProps | undefined;
  Home: HomeProps | undefined;
  SignIn: SignInProps | undefined;
  Instruct: InstructProps | undefined;
  Play: PlayProps | undefined;
  HappyPresent: HappyPresentProps | undefined;
  ScanQR: ScanQRProps | undefined;
  Collection: CollectionProps | undefined;
  DetailGift: DetailGiftProps | undefined;
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
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Instruct" component={Instruct} />
        <Stack.Screen name="Play" component={Play} />
        <Stack.Screen name="HappyPresent" component={HappyPresent} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="DetailGift" component={DetailGift} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const _styles = StyleSheet.create({});
export const HomeNavigation = React.memo(_HomeNavigation);
