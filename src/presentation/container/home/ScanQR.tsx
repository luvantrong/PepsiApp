import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, storage } from "@shared-state";
import { getUrlImage } from "../sign-in";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import {
  BackgroundApp,
  Button,
  Header,
  PopupErrorQR,
  PopupSignOut,
  PopupSucces,
  TextField,
  TextView,
} from "@components";
import {
  BACKGROUND_SIGNUP,
  BG_BUTTON_SELECT_PLAY,
  BG_SIGNIN_CHECK,
  BILL_QR,
  ICON_ARROW,
  ICON_LOGOUT,
} from "@assets";
import { DimensionsStyle } from "@resources";

type PropsType = NativeStackScreenProps<HomeStackParamList, "ScanQR">;

const _ScanQR: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);

  const handleNotification = () => {
    const randomBoolean = Math.random() < 0.5;
    if (randomBoolean) {
      setModalVisibleSuccess(true);
    } else {
      setModalVisibleError(true);
    }
  };
  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_SIGNUP]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleError}
        >
          <PopupErrorQR
            onPress={() => {
              setModalVisibleError(!modalVisibleError);
            }}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSuccess}
        >
          <PopupSucces
            onPressReScan={() => {
              setModalVisibleSuccess(!modalVisibleSuccess);
            }}
            onPressPlay={() => {
              setModalVisibleSuccess(!modalVisibleSuccess);
              navigation.push("Play");
            }}
            sumPlay="8"
          />
        </Modal>
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
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Quét mã"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={true}
          containerStyle={{ marginTop: 10 }}
          onPressRight={() => setModalVisibleSignOut(true)}
          onPressLeft={() => navigation.push("Home")}
        />
        <Image
          source={{ uri: listAllImages[BILL_QR] }}
          style={_styles.imageBill}
        />
        <Button
          sumPlay=""
          title="Quét mã"
          uriImage={listAllImages[BG_SIGNIN_CHECK]}
          pressableStyle={_styles.buttonConfirm}
          onPress={handleNotification}
        />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  imageBill: {
    width: DimensionsStyle.width * 0.8,
    height: DimensionsStyle.height * 0.65,
    resizeMode: "stretch",
    alignSelf: "center",
    marginTop: 40,
  },

  buttonConfirm: {
    alignSelf: "center",
    marginTop: 30,
  },
});
export const ScanQR = React.memo(_ScanQR);
