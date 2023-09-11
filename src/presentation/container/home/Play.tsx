import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { BackgroundApp, Header, TextViewBold } from "@components";
import { BACKGROUND_PLAY, ICON_ARROW, ICON_LOGOUT, IMAGE_HOME } from "@assets";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";
import { getUrlImage } from "../sign-in";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Play">;

const screenHeight = DimensionsStyle.height;

const _Play: React.FC<PropsType> = (props) => {
  const { navigation, route } = props;
  const listAllImages = useSelector<RootState, string[]>(
    (state) => state.storage.storage
  );

  const type = route.params?.type;
  const sumPlay = route.params?.sumPlay;
  const [typePlay, setTypePlay] = React.useState<string>("miễn phí");

  if (type === false) {
    setTypePlay("quy đổi");
  }

  const textContentPlay = "Bạn còn " + sumPlay + " lượt chơi " + typePlay;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          pan.setValue({ x: 0, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -screenHeight / 5) {
          navigation.push("SignIn");
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <BackgroundApp uri={getUrlImage(listAllImages, BACKGROUND_PLAY)}>
      <SafeAreaView style={_styles.container}>
        <Header
          iconLeft={getUrlImage(listAllImages, ICON_ARROW)}
          titleCenter="Vuốt lên để chơi"
          iconRight={getUrlImage(listAllImages, ICON_LOGOUT)}
          loginStatus={true}
          containerStyle={{ marginTop: 10 }}
          titleCenterStyle={{ textTransform: "uppercase" }}
        />
        <TextViewBold
          text={textContentPlay}
          boldTexts={[sumPlay + ""]}
          textStyle={{
            fontSize: 16,
          }}
          boldStyle={{ fontSize: 18 }}
        />
        <Animated.View
          style={[
            _styles.imageContainer,
            { transform: pan.getTranslateTransform(), bottom: -50 },
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: getUrlImage(listAllImages, IMAGE_HOME) }}
            style={_styles.image}
          />
        </Animated.View>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    alignSelf: "center",
  },
});

export const Play = React.memo(_Play);
