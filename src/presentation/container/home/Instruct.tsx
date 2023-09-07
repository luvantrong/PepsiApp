import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { BackgroundApp, Header } from "@components";
import { getImageUrl } from "../sign-in";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { Colors } from "@resources";
import {
  BACKGROUND_HOME,
  BACKGROUND_PRESENT,
  ICON_ARROW,
  ICON_LOGOUT,
  fontFamily,
} from "@assets";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Instruct">;

const _Instruct: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_PRESENT)}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          iconLeft={getImageUrl(ICON_ARROW)}
          titleCenter="Hướng dẫn"
          iconRight={getImageUrl(ICON_LOGOUT)}
          loginStatus={true}
        />
        <ScrollView
          style={_styles.scrollViewStyle}
          scrollIndicatorInsets={{ right: 4 }}
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  contentRulesStyle: {
    fontFamily: fontFamily.medium,
    color: Colors.WHITE,
    fontSize: 12,
    textAlign: "justify",
  },

  scrollViewStyle: {
    marginTop: 10,
    marginStart: 35,
    paddingEnd: 35,
  },
});

export const Instruct = React.memo(_Instruct);
