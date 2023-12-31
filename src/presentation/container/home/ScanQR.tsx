import { SafeAreaView, StyleSheet, Modal, Image } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AppContext,
  DataUpdateTurn,
  RootState,
  signOut,
  updateTurn,
  useAppDispatch,
} from "@shared-state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import {
  BackgroundApp,
  Button,
  Header,
  PopupErrorQR,
  PopupSignOut,
  PopupSucces,
} from "@components";
import {
  BACKGROUND_SIGNUP,
  BG_SIGNIN_CHECK,
  BILL_QR,
  ICON_ARROW,
  ICON_LOGOUT,
} from "@assets";
import { DimensionsStyle } from "@resources";
import { User } from "@domain";

type PropsType = NativeStackScreenProps<HomeStackParamList, "ScanQR">;

const _ScanQR: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const dataUser = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );

  const { isLoggedIn, setLoggedIn } = React.useContext(AppContext);

  let sumPlay = `${dataUser.turn.free + dataUser.turn.exchange}`;

  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);

  const handleUpdateTurn = () => {
    let turns = {
      free: dataUser.turn.free,
      exchange: dataUser.turn.exchange,
    };
    turns.exchange = dataUser.turn.exchange + 5;
    const dataUpdateTurn: DataUpdateTurn = {
      key: dataUser.key,
      turn: turns,
    };
    dispatch(updateTurn(dataUpdateTurn));
  };

  const handleNotification = () => {
    const randomBoolean = Math.random() < 0.5;
    if (randomBoolean) {
      handleUpdateTurn();
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

              navigation.push("Play", {
                type: false,
                sumPlay: `${dataUser.turn.exchange}`,
              });
            }}
            sumPlay={sumPlay}
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
              setLoggedIn(false);
              dispatch(signOut());
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
          loginStatus={isLoggedIn}
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
    position: "absolute",
    bottom: DimensionsStyle.height * 0.085,
  },
});
export const ScanQR = React.memo(_ScanQR);
