import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  BackgroundApp,
  Button,
  PopupSelectPlay,
  PopupSignOut,
} from "@components";
import {
  BACKGROUND_HOME,
  BG_PLAY,
  BG_SIGNIN,
  ICON_ARROW,
  ICON_LOGOUT,
  IMAGE_HOME,
  fontFamily,
} from "@assets";
import { getImageUrl } from "../sign-in";
import { Header } from "@components";
import { Colors, DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Home">;

const _Home: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [modalVisibleSelectPlay, setModalVisibleSelectPlay] = useState(false);
  let titleSum = "Bạn có tổng cộng 3 lượt chơi";
  let sumPlay = "8";
  let newTitleSum = titleSum.replace("3", sumPlay);
  const handleGoToInstruct = () => {
    navigation.push("Instruct");
  };

  const handleShowPopupSignOut = () => {
    setModalVisibleSignOut(true);
  };

  const handleShowPopupSelectPlay = () => {
    setModalVisibleSelectPlay(true);
  };

  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_HOME)}>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              // setLoggedIn(false);
              // setDataUser({} as User);
              navigation.push("SignIn");
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSelectPlay}
        >
          <PopupSelectPlay
            sumPlayFree="3"
            sumPlayExchange="0"
            onPressClose={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
            }}
            onPressFree={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
              // setLoggedIn(false);
              // setDataUser({} as User);
              navigation.push("SignIn");
            }}
            onPressExchange={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
            }}
          />
        </Modal>
        <Header
          iconLeft={getImageUrl(ICON_ARROW)}
          titleCenter="Thể lệ chương trình"
          iconRight={getImageUrl(ICON_LOGOUT)}
          loginStatus={true}
          titleCenterStyle={{ opacity: 0 }}
          iconLeftStyle={{ opacity: 0 }}
          containerStyle={{ marginTop: 10 }}
          onPressRight={handleShowPopupSignOut}
        />
        <Image
          source={{ uri: getImageUrl(IMAGE_HOME) }}
          style={_styles.imageCenter}
        />
        <View style={_styles.viewMenu}>
          <Pressable onPress={handleGoToInstruct}>
            <Text style={_styles.textRules}>Hướng dẫn</Text>
          </Pressable>

          <Button
            sumPlay={sumPlay}
            title="Chơi ngay"
            uriImage={getImageUrl(BG_PLAY)}
            pressableStyle={{
              height: 60,
            }}
            titleSmall={newTitleSum}
            onPress={handleShowPopupSelectPlay}
          />
          <Button
            sumPlay=""
            title="Quét mã"
            uriImage={getImageUrl(BG_SIGNIN)}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
          />
          <Button
            sumPlay=""
            title="Bộ sưu tập"
            uriImage={getImageUrl(BG_SIGNIN)}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
          />
          <Button
            sumPlay=""
            title="Chi tiết quà tặng"
            uriImage={getImageUrl(BG_SIGNIN)}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
          />
        </View>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  imageCenter: {
    width: DimensionsStyle.width * 0.55,
    height: DimensionsStyle.width * 0.6,
    alignSelf: "center",
    marginTop: DimensionsStyle.height * 0.1,
    resizeMode: "stretch",
  },

  viewMenu: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  textRules: {
    fontFamily: fontFamily.Black721,
    fontSize: 18,
    color: Colors.YELLOW,
    marginTop: 15,
    marginBottom: 10,
  },

  pressableStyle: {
    borderColor: Colors.YELLOW,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
  },
});

export const Home = React.memo(_Home);
