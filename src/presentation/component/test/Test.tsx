import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { BACKGROUND_APP, BACKGROUND_SIGNUP, fontFamily } from "@assets";
import { Colors } from "@resources";
import { storage } from "@shared-state";
import { BackgroundApp } from "../background";
import { HomeStackParamList } from "@navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getImageUrl } from "@containers";
type PropsType = NativeStackScreenProps<HomeStackParamList, "Test">;

type Banner = {
  key: string;
  name: string;
  age: number;
};

const _Test: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_SIGNUP)}>
      <SafeAreaView>
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Test</Text>
        </Pressable>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({});

export const Test = React.memo(_Test);
