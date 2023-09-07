import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BackgroundApp, Header, TextViewBold } from "@components";
import { getImageUrl } from "../sign-in";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { Colors, DimensionsStyle } from "@resources";
import {
  BACKGROUND_HOME,
  BACKGROUND_PRESENT,
  ICON_ARROW,
  ICON_LOGOUT,
  IMG_INSTRUCT_1,
  IMG_INSTRUCT_2,
  fontFamily,
} from "@assets";
import { IInstruct } from "src/domain/entity";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Instruct">;
type ItemProps = {
  item: IInstruct;
};

const Item = ({ item }: ItemProps) => (
  <View style={{ marginBottom: 45 }}>
    <Image
      source={{ uri: getImageUrl(item.image) }}
      style={{
        width: DimensionsStyle.width * 0.8,
        height: DimensionsStyle.width * 0.8,
        marginBottom: 20,
        borderRadius: 20,
      }}
    />
    <TextViewBold
      text={item.content}
      boldTexts={["Bước 1:", "Bước 2:", "Bước 3"]}
      textStyle={{ fontSize: 18, textAlign: "center" }}
      boldStyle={{
        fontSize: 18,
        color: Colors.WHITE,
        fontFamily: fontFamily.Black721,
      }}
      viewStyle={{ width: DimensionsStyle.width * 0.7, alignSelf: "center" }}
    />
  </View>
);

const _Instruct: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const handleGoToHome = () => navigation.push("Home");
  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_PRESENT)}>
      <SafeAreaView style={{ flex: 1, marginBottom: -40 }}>
        <Header
          iconLeft={getImageUrl(ICON_ARROW)}
          titleCenter="Hướng dẫn"
          iconRight={getImageUrl(ICON_LOGOUT)}
          loginStatus={true}
          onPressLeft={handleGoToHome}
        />
        <ScrollView
          style={_styles.scrollViewStyle}
          scrollIndicatorInsets={{ right: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {DATA.map((item) => (
            <Item item={item} key={item.key} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  scrollViewStyle: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export const Instruct = React.memo(_Instruct);

const DATA: IInstruct[] = [
  {
    key: "1",
    image: IMG_INSTRUCT_1,
    content:
      "Bước 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
  {
    key: "2",
    image: IMG_INSTRUCT_2,
    content:
      "Bước 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
  {
    key: "3",
    image: IMG_INSTRUCT_1,
    content:
      "Bước 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
];
