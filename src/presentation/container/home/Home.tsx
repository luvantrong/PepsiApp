import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Header } from "@components";
import { Colors, DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, getAllExchangeGift } from "@shared-state";
import { User } from "@domain";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Home">;

const _Home: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const dataUser = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );

  const dispatch = useAppDispatch();
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [modalVisibleSelectPlay, setModalVisibleSelectPlay] = useState(false);
  let titleSum = "Bạn có tổng cộng 3 lượt chơi";

  const [sumPlayFree, setSumPlayFree] = useState(0);
  const [sumPlayExchange, setSumPlayExchange] = useState(0);

  useEffect(() => {
    setSumPlayFree(dataUser.turn.free);
    setSumPlayExchange(dataUser.turn.exchange);
  }, [dataUser]);

  const sumPlay = sumPlayFree + sumPlayExchange;
  let newTitleSum = titleSum.replace("3", sumPlay.toString());
  const handleGoToInstruct = () => {
    navigation.push("Instruct");
  };

  const handleShowPopupSignOut = () => {
    setModalVisibleSignOut(true);
  };

  const handleShowPopupSelectPlay = () => {
    setModalVisibleSelectPlay(true);
  };

  useEffect(() => {
    dispatch(getAllExchangeGift());
  }, []);

  console.log("dataUser", dataUser);

  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_HOME]}>
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
            sumPlayFree={`${dataUser.turn.free}`}
            sumPlayExchange={`${dataUser.turn.exchange}`}
            onPressClose={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
            }}
            onPressFree={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
              navigation.push("Play", {
                type: true,
                sumPlay: `${dataUser.turn.free}`,
              });
            }}
            onPressExchange={() => {
              setModalVisibleSelectPlay(!modalVisibleSelectPlay);
              navigation.push("Play", {
                type: false,
                sumPlay: `${dataUser.turn.exchange}`,
              });
            }}
          />
        </Modal>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Thể lệ chương trình"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={true}
          titleCenterStyle={{ opacity: 0 }}
          iconLeftStyle={{ opacity: 0 }}
          containerStyle={{ marginTop: 10 }}
          onPressRight={handleShowPopupSignOut}
        />
        <Image
          source={{ uri: listAllImages[IMAGE_HOME] }}
          style={_styles.imageCenter}
        />
        <View style={_styles.viewMenu}>
          <Pressable onPress={handleGoToInstruct}>
            <Text style={_styles.textRules}>Hướng dẫn</Text>
          </Pressable>

          <Button
            sumPlay={sumPlay.toString()}
            title="Chơi ngay"
            uriImage={listAllImages[BG_PLAY]}
            pressableStyle={{
              height: 60,
            }}
            titleSmall={newTitleSum}
            onPress={handleShowPopupSelectPlay}
          />
          <Button
            sumPlay=""
            title="Quét mã"
            uriImage={listAllImages[BG_SIGNIN]}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
            onPress={() => navigation.push("ScanQR")}
          />
          <Button
            sumPlay=""
            title="Bộ sưu tập"
            uriImage={listAllImages[BG_SIGNIN]}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
            onPress={() => navigation.push("Collection")}
          />
          <Button
            sumPlay=""
            title="Chi tiết quà tặng"
            uriImage={listAllImages[BG_SIGNIN]}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={_styles.pressableStyle}
            onPress={() => navigation.push("DetailGift")}
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
