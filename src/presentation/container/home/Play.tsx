import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { BackgroundApp, Header, PopupSignOut, TextViewBold } from "@components";
import {
  BACKGROUND_PLAY,
  ICON_ARROW,
  ICON_LOGOUT,
  IMAGE_CENTER_PLAY,
  IMAGE_HOME,
  IMAGE_TARGET,
} from "@assets";
import { useSelector } from "react-redux";
import { AppContext, RootState } from "@shared-state";
import { getUrlImage } from "../sign-in";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Play">;

const screenHeight = DimensionsStyle.height;

const _Play: React.FC<PropsType> = (props) => {
  const { navigation, route } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const { isLoggedIn, setLoggedIn } = React.useContext(AppContext);
  const type = route.params?.type;
  const sumPlay = route.params?.sumPlay;
  const [typePlay, setTypePlay] = React.useState<string>("miễn phí");
  const [opacityImageTarget, setOpacityImageTarget] = React.useState<number>(1);

  useEffect(() => {
    if (type === false) {
      setTypePlay("quy đổi");
    }
  }, []);

  const textContentPlay = "Bạn còn " + sumPlay + " lượt chơi " + typePlay;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          pan.setValue({ x: 0, y: gesture.dy });
        }
        if (gesture.dy < -screenHeight / 5) {
          setOpacityImageTarget(0);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -screenHeight / 5) {
          navigation.push("HappyPresent", { type: type });
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
    <BackgroundApp uri={listAllImages[BACKGROUND_PLAY]}>
      <SafeAreaView style={_styles.container}>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Vuốt lên để chơi"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={isLoggedIn}
          containerStyle={{ marginTop: 10 }}
          titleCenterStyle={{ textTransform: "uppercase" }}
          onPressLeft={() => navigation.push("Home")}
          onPressRight={() => {
            setModalVisibleSignOut(true);
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              setLoggedIn(false);
              // setDataUser({} as User);
              navigation.push("SignIn");
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>
        <TextViewBold
          text={textContentPlay}
          boldTexts={[sumPlay + ""]}
          textStyle={{
            fontSize: 16,
          }}
          boldStyle={{ fontSize: 18 }}
        />
        <Image
          source={{ uri: listAllImages[IMAGE_TARGET] }}
          style={[_styles.imageTarget, { opacity: opacityImageTarget }]}
        />
        <Image
          source={{ uri: listAllImages[IMAGE_CENTER_PLAY] }}
          style={_styles.imageCenter}
        />
        <Animated.View
          style={[
            _styles.imageContainer,
            { transform: pan.getTranslateTransform(), bottom: -60 },
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: listAllImages[IMAGE_HOME] }}
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
    width: DimensionsStyle.width * 0.55,
    height: DimensionsStyle.width * 0.6,
    resizeMode: "stretch",
    alignSelf: "center",
  },

  imageTarget: {
    width: 64,
    height: 56,
    resizeMode: "stretch",
    alignSelf: "center",
    position: "absolute",
    bottom: DimensionsStyle.height * 0.21,
  },

  imageCenter: {
    width: DimensionsStyle.width * 1,
    height: DimensionsStyle.width * 1.4,
    resizeMode: "stretch",
    alignSelf: "center",
  },
});

export const Play = React.memo(_Play);
